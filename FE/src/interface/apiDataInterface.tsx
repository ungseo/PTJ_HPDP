// Notion에 이름똑같이 구분해놨읍니다. Ctrl + F 로 찾아서 하든지
// request 데이타는 header 빼고 넣어야할 값들만 타입지정 해놓음, In + 기능 + 목적어 ex) InSearchCompanyInfo

import { AxiosHeaderValue } from "axios";

// response 데이타는 전부 다 지정해놓음, Out + 기능 + 목적어 => reponse.data.data (x) reponse자체에 인터페이스적용하기.
// 인증 request, response Interface

//로그인
export interface InLoginInterface {
  loginId: string;
  loginPw: string;
}

export interface OutLoginInterface {
  header: {
    accessToken: string;
    refreshToken: string;
  };
  body: {
    statusCode: number;
    message: string;
    data: {
      name: string;
      role: "INDIVIDUAL" | "COMPANY"; // 역할은 INDIVIDUAL 또는 COMPANY 중 하나여야 함
    };
  };
}
//회원가입
export interface InSignupInterface {
  loginId: string;
  loginPw: string;
  name: string;
  email?: string;
  address?: string;
  phoneNumber?: string;
}

// 아이디 중복 체크
export interface InIdCheckInterface {}

// Access Token 만료됐을 때
export interface TokenInterface {
  accessToken: string;
  refreshToken: string;
}

// 로그아웃
export interface InLogoutRequestInterface {
  accessToken: string | null;
}

// 내정보 조회
//(개인멤버)
interface OutIndividualMemberInterface {
  body: {
    statusCode: 200;
    message: "Success";
    data: {
      memberId: number;
      loginId: string;
      name: string;
      address: string;
      email: string;
      phoneNumber: string;
      point: number;
      profile: string;
      role: "INDIVIDUAL";
      createdDate: string;
      modifiedDate: string;
    };
  };
}

interface OutCompanyMemberInterface {
  body: {
    statusCode: 200;
    message: "Success";
    data: {
      memberId: number;
      loginId: string;
      name: string;
      address: string;
      email: string;
      phoneNumber: string;
      point: number;
      profile: string;
      registrationNumber: string;
      websiteUrl: string;
      introduce: string;
      hashtag: string;
      role: "COMPANY";
      createdDate: string;
      modifiedDate: string;
    };
  };
}

export type OutMemberInfoInterface =
  | OutIndividualMemberInterface
  | OutCompanyMemberInterface;

// 기업 request, response Interface

// 기업 조회 & 기업 상세 조회
export interface InSearchCompanyInfoResponseInterface {
  companyId: number;
  profile: string;
  banner:string;
  name: string;
  hashtag: string;
  isInterested: boolean;
  email?: string;
  phoneNumber?: string;
  address?: string;
  registrationNumber?: string;
  websiteUrl?: string;
  introduce?: string;
  createdDate?: string;
  fundingsNumber?: number;
  participantsNumber?: number;
  amount?: number;
  };

// 기업 펀딩 조회

export interface OutCompanyFundingInfoInterface {
  body: {
    statusCode: number;
    message: string;
    data: {
      companyId: number;
      name: string;
      thumbnail: string;
      hashtag: string;
      title: string;
      target_amount: number;
      startDate: string;
      endDate: string;
      dDay: string;
      totalFunding: number;
      state: string;
    };
  };
}

// 펀딩 request, response Interface

// 펀딩 조회 & 펀딩 상세조회
export interface OutFundingsInfoInterface {
  body: {
    statusCode: number;
    message: string;
    data: {
      companyId: number; //
      name: string; //
      thumbnail: string; //
      hashtag: string; //
      title: string; //
      target_amount: number; //
      startDate: string; //
      endDate: string; //
      dDay: string; //
      totalFunding: number; //
      state: string; //
      content_url?: string;
      reward_name?: string;
      reward_price?: number;
      reward_desc?: string;
      reward_img?: string;
      settlement?: number;
    }[];
  };
}

//펀딩 예산 상세 조회
export interface OutFundingBudgetInterface {
  body: {
    statusCode: number;
    message: string;
    data: {
      price: number;
      content: string;
    };
  };
}

//펀딩 정산하기
export interface OutFundingWidtdrawlInterface {
  header: {
    accessToken: string;
  };
  body: {
    statusCode: number;
    message: string;
    data: {
      totalPoint: number;
    };
  };
}

export interface InRegisterReportInterface {
  data: {
    fundingId: string;
    docsUrl: File;
  };
}

//관심기업

//관심기업 등록

//관심기업 조회
export interface OutSearchInterestCompanyInterface {
  body: {
    statusCode: number;
    message: string;
    data: {
      companyId: number;
      name: string;
      profile: string;
    }[];
  };
}

//관심기업 삭제

//은행 response, request

//계좌 등록

export interface InRegisterAccountInterface {
  data: {
    accountNumber: string;
    accountPw: number;
    bankCode: number;
  };
}

//계좌 조회

export interface OutSearchAccountInterface {
  body: {
    statusCode: number;
    message: string;
    data: {
      accountNumber: string;
      bankCode: number;
      balance: number;
    };
  };
}

//계좌 이체

export interface InSendMoneyInterface {
  data: {
    accountPw: number;
    toBankCode: number;
    opponentAccount: string;
    depositAmount: number;
  };
}

export interface OutSendMoneyInterface {
  body: {
    statusCode: number;
    message: string;
    data: {
      toName: string;
      depositAmount: number;
    };
  };
}

export interface OutSearchSendHistoryInterface {
  body: {
    statusCode: number;
    message: string;
    data: {
      flag: boolean;
      content: string;
      afterBlnc: number;
      opponentName: string;
      opponentAccount: string;
      createdDate: string;
    }[];
  };
}

// 결제

export interface InCreatePaymentsInterface {
  header: { accessToken: string | null };
  body: {
    amount: number | string | null;
    retUrl?: string;
    retCancleUrl?: string;
  };
}
