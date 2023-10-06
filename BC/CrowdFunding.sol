// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

contract CrowdFunding {
    IERC20 public token;  // 사용되는 ERC20 토큰
    address public owner;  // 컨트랙트의 소유자
    address public serviceWallet;  // 서비스 지갑 주소

    // 각 펀딩 프로젝트에 대한 정보 구조
    struct Funding {
        uint256 id; // 추가된 id 필드
        address beneficiary; // 기업 주소
        uint256 goal; // 목표 금액
        uint256 raisedAmount; // 펀딩 활성화 상태
        bool isActive; // 펀딩이 이미 청구되었는지
        bool isWithdrawn; // 펀딩 성공 여부
        uint256 deadline;  // 마감 기한 

    }

    mapping(uint256 => Funding) public fundings; // 배열에서 매핑으로 변경

    constructor(address _tokenAddress, address _serviceWallet) {
        token = IERC20(_tokenAddress); // ERC20 토큰 설정
        owner = msg.sender; // 컨트랙트 소유자
        serviceWallet = _serviceWallet; // 서비스 지갑 주소
    }
    
    // 새 펀딩 생성
     function createFunding(uint256 _fundingId, uint256 _goal, uint256 _durationInDays) external {
        require(fundings[_fundingId].beneficiary == address(0), "Funding ID already exists"); // 중복 ID 확인

        uint256 deadline = block.timestamp + _durationInDays * 1 days;

        fundings[_fundingId] = Funding({
            id: _fundingId, // 지정한 ID 사용
            beneficiary: msg.sender,    
            goal: _goal,
            raisedAmount: 0,
            isActive: true,
            isWithdrawn: false,
            deadline: deadline
        });
    }

    // 펀딩에 기여
    function contribute(uint256 _fundingId, uint256 _amount) external {
        Funding storage funding = fundings[_fundingId];
        require(funding.isActive, "Funding is not active");
        require(token.transferFrom(msg.sender, funding.beneficiary, _amount), "Token transfer failed");  // A에서 C로 직접 전송

        funding.raisedAmount += _amount;
    }

    // 기업이 정산하기를 누를 때 호출되는 함수
    function settleFunds(uint256 _fundingId) external {
        Funding storage funding = fundings[_fundingId];
        require(funding.beneficiary == msg.sender, "Only beneficiary can settle");
        require(funding.isActive, "Funding is not active");
        require(!funding.isWithdrawn, "Funds already settled");
        require(funding.raisedAmount >= funding.goal, "Goal not met yet");
        require(block.timestamp >= funding.deadline, "Deadline not reached");  // 여기에 추가된 부분


        uint256 amountToTransfer = funding.raisedAmount;
        funding.raisedAmount = 0;
        funding.isWithdrawn = true;

        require(token.transferFrom(funding.beneficiary, serviceWallet, amountToTransfer), "Token transfer to service wallet failed");  // C에서 B로 전송
    }

    // 펀딩 중단 및 활성화 (예: 목표금액 달성 등의 이유로)
    function toggleFundingActiveState(uint256 _fundingId) external {
        require(msg.sender == owner, "Only owner can toggle funding state");
        fundings[_fundingId].isActive = !fundings[_fundingId].isActive;
    }
}
