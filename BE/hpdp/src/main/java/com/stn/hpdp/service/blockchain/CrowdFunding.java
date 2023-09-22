package com.stn.hpdp.service.blockchain;

import java.math.BigInteger;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.Callable;
import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Bool;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.RemoteCall;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tuples.generated.Tuple6;
import org.web3j.tx.Contract;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.gas.ContractGasProvider;

/**
 * <p>Auto generated code.
 * <p><strong>Do not modify!</strong>
 * <p>Please use the <a href="https://docs.web3j.io/command_line.html">web3j command line tools</a>,
 * or the org.web3j.codegen.SolidityFunctionWrapperGenerator in the 
 * <a href="https://github.com/web3j/web3j/tree/master/codegen">codegen module</a> to update.
 *
 * <p>Generated with web3j version 1.5.0.
 */
@SuppressWarnings("rawtypes")
public class CrowdFunding extends Contract {
    public static final String BINARY = "60806040523480156200001157600080fd5b50604051620013413803806200134183398181016040528101906200003791906200016b565b816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050620001b2565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620001338262000106565b9050919050565b620001458162000126565b81146200015157600080fd5b50565b60008151905062000165816200013a565b92915050565b6000806040838503121562000185576200018462000101565b5b6000620001958582860162000154565b9250506020620001a88582860162000154565b9150509250929050565b61117f80620001c26000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c80638da5cb5b1161005b5780638da5cb5b14610113578063ccaf0a6a14610131578063d13cb1fb1461014d578063fc0c546a1461018257610088565b806310c3e7051461008d5780635641f3c3146100a9578063795f1a58146100c75780638c590917146100f7575b600080fd5b6100a760048036038101906100a29190610a0b565b6101a0565b005b6100b16104e7565b6040516100be9190610a79565b60405180910390f35b6100e160048036038101906100dc9190610a94565b61050d565b6040516100ee9190610ae3565b60405180910390f35b610111600480360381019061010c9190610a94565b610663565b005b61011b6107fd565b6040516101289190610a79565b60405180910390f35b61014b60048036038101906101469190610a0b565b610823565b005b61016760048036038101906101629190610a0b565b610926565b60405161017996959493929190610b19565b60405180910390f35b61018a6109ac565b6040516101979190610bd9565b60405180910390f35b6000600382815481106101b6576101b5610bf4565b5b906000526020600020906005020190503373ffffffffffffffffffffffffffffffffffffffff168160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610258576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161024f90610c80565b60405180910390fd5b8060030160009054906101000a900460ff166102a9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102a090610cec565b60405180910390fd5b8060030160019054906101000a900460ff16156102fb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102f290610d58565b60405180910390fd5b806001015481600201541015610346576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161033d90610dc4565b60405180910390fd5b806004015442101561038d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161038490610e30565b60405180910390fd5b6000816002015490506000826002018190555060018260030160016101000a81548160ff02191690831515021790555060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd8360000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16846040518463ffffffff1660e01b815260040161046093929190610e50565b6020604051808303816000875af115801561047f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104a39190610eb3565b6104e2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104d990610f52565b60405180910390fd5b505050565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600080620151808361051f9190610fa1565b4261052a9190610fe3565b905060036040518060c001604052803373ffffffffffffffffffffffffffffffffffffffff1681526020018681526020016000815260200160011515815260200160001515815260200183815250908060018154018082558091505060019003906000526020600020906005020160009091909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550602082015181600101556040820151816002015560608201518160030160006101000a81548160ff02191690831515021790555060808201518160030160016101000a81548160ff02191690831515021790555060a082015181600401555050600160038054905061065a9190611017565b91505092915050565b60006003838154811061067957610678610bf4565b5b906000526020600020906005020190508060030160009054906101000a900460ff166106da576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106d190610cec565b60405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd338360000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16856040518463ffffffff1660e01b815260040161075b93929190610e50565b6020604051808303816000875af115801561077a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061079e9190610eb3565b6107dd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107d490611097565b60405180910390fd5b818160020160008282546107f19190610fe3565b92505081905550505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146108b3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108aa90611129565b60405180910390fd5b600381815481106108c7576108c6610bf4565b5b906000526020600020906005020160030160009054906101000a900460ff1615600382815481106108fb576108fa610bf4565b5b906000526020600020906005020160030160006101000a81548160ff02191690831515021790555050565b6003818154811061093657600080fd5b90600052602060002090600502016000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020154908060030160009054906101000a900460ff16908060030160019054906101000a900460ff16908060040154905086565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600080fd5b6000819050919050565b6109e8816109d5565b81146109f357600080fd5b50565b600081359050610a05816109df565b92915050565b600060208284031215610a2157610a206109d0565b5b6000610a2f848285016109f6565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610a6382610a38565b9050919050565b610a7381610a58565b82525050565b6000602082019050610a8e6000830184610a6a565b92915050565b60008060408385031215610aab57610aaa6109d0565b5b6000610ab9858286016109f6565b9250506020610aca858286016109f6565b9150509250929050565b610add816109d5565b82525050565b6000602082019050610af86000830184610ad4565b92915050565b60008115159050919050565b610b1381610afe565b82525050565b600060c082019050610b2e6000830189610a6a565b610b3b6020830188610ad4565b610b486040830187610ad4565b610b556060830186610b0a565b610b626080830185610b0a565b610b6f60a0830184610ad4565b979650505050505050565b6000819050919050565b6000610b9f610b9a610b9584610a38565b610b7a565b610a38565b9050919050565b6000610bb182610b84565b9050919050565b6000610bc382610ba6565b9050919050565b610bd381610bb8565b82525050565b6000602082019050610bee6000830184610bca565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600082825260208201905092915050565b7f4f6e6c792062656e65666963696172792063616e20736574746c650000000000600082015250565b6000610c6a601b83610c23565b9150610c7582610c34565b602082019050919050565b60006020820190508181036000830152610c9981610c5d565b9050919050565b7f46756e64696e67206973206e6f74206163746976650000000000000000000000600082015250565b6000610cd6601583610c23565b9150610ce182610ca0565b602082019050919050565b60006020820190508181036000830152610d0581610cc9565b9050919050565b7f46756e647320616c726561647920736574746c65640000000000000000000000600082015250565b6000610d42601583610c23565b9150610d4d82610d0c565b602082019050919050565b60006020820190508181036000830152610d7181610d35565b9050919050565b7f476f616c206e6f74206d65742079657400000000000000000000000000000000600082015250565b6000610dae601083610c23565b9150610db982610d78565b602082019050919050565b60006020820190508181036000830152610ddd81610da1565b9050919050565b7f446561646c696e65206e6f742072656163686564000000000000000000000000600082015250565b6000610e1a601483610c23565b9150610e2582610de4565b602082019050919050565b60006020820190508181036000830152610e4981610e0d565b9050919050565b6000606082019050610e656000830186610a6a565b610e726020830185610a6a565b610e7f6040830184610ad4565b949350505050565b610e9081610afe565b8114610e9b57600080fd5b50565b600081519050610ead81610e87565b92915050565b600060208284031215610ec957610ec86109d0565b5b6000610ed784828501610e9e565b91505092915050565b7f546f6b656e207472616e7366657220746f20736572766963652077616c6c657460008201527f206661696c656400000000000000000000000000000000000000000000000000602082015250565b6000610f3c602783610c23565b9150610f4782610ee0565b604082019050919050565b60006020820190508181036000830152610f6b81610f2f565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610fac826109d5565b9150610fb7836109d5565b9250828202610fc5816109d5565b91508282048414831517610fdc57610fdb610f72565b5b5092915050565b6000610fee826109d5565b9150610ff9836109d5565b925082820190508082111561101157611010610f72565b5b92915050565b6000611022826109d5565b915061102d836109d5565b925082820390508181111561104557611044610f72565b5b92915050565b7f546f6b656e207472616e73666572206661696c65640000000000000000000000600082015250565b6000611081601583610c23565b915061108c8261104b565b602082019050919050565b600060208201905081810360008301526110b081611074565b9050919050565b7f4f6e6c79206f776e65722063616e20746f67676c652066756e64696e6720737460008201527f6174650000000000000000000000000000000000000000000000000000000000602082015250565b6000611113602383610c23565b915061111e826110b7565b604082019050919050565b6000602082019050818103600083015261114281611106565b905091905056fea264697066735822122051f9050686cc27cf6b5d3df557b89c4ec629f9bf6112f24aec6bc7135b79870764736f6c63430008120033";

    public static final String FUNC_CONTRIBUTE = "contribute";

    public static final String FUNC_CREATEFUNDING = "createFunding";

    public static final String FUNC_FUNDINGS = "fundings";

    public static final String FUNC_OWNER = "owner";

    public static final String FUNC_SERVICEWALLET = "serviceWallet";

    public static final String FUNC_SETTLEFUNDS = "settleFunds";

    public static final String FUNC_TOGGLEFUNDINGACTIVESTATE = "toggleFundingActiveState";

    public static final String FUNC_TOKEN = "token";

    @Deprecated
    protected CrowdFunding(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected CrowdFunding(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected CrowdFunding(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected CrowdFunding(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public RemoteFunctionCall<TransactionReceipt> contribute(BigInteger _fundingId, BigInteger _amount) {
        final Function function = new Function(
                FUNC_CONTRIBUTE, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(_fundingId), 
                new org.web3j.abi.datatypes.generated.Uint256(_amount)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> createFunding(BigInteger _goal, BigInteger _durationInDays) {
        final Function function = new Function(
                FUNC_CREATEFUNDING, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(_goal), 
                new org.web3j.abi.datatypes.generated.Uint256(_durationInDays)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<Tuple6<String, BigInteger, BigInteger, Boolean, Boolean, BigInteger>> fundings(BigInteger param0) {
        final Function function = new Function(FUNC_FUNDINGS, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(param0)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}, new TypeReference<Uint256>() {}, new TypeReference<Uint256>() {}, new TypeReference<Bool>() {}, new TypeReference<Bool>() {}, new TypeReference<Uint256>() {}));
        return new RemoteFunctionCall<Tuple6<String, BigInteger, BigInteger, Boolean, Boolean, BigInteger>>(function,
                new Callable<Tuple6<String, BigInteger, BigInteger, Boolean, Boolean, BigInteger>>() {
                    @Override
                    public Tuple6<String, BigInteger, BigInteger, Boolean, Boolean, BigInteger> call() throws Exception {
                        List<Type> results = executeCallMultipleValueReturn(function);
                        return new Tuple6<String, BigInteger, BigInteger, Boolean, Boolean, BigInteger>(
                                (String) results.get(0).getValue(), 
                                (BigInteger) results.get(1).getValue(), 
                                (BigInteger) results.get(2).getValue(), 
                                (Boolean) results.get(3).getValue(), 
                                (Boolean) results.get(4).getValue(), 
                                (BigInteger) results.get(5).getValue());
                    }
                });
    }

    public RemoteFunctionCall<String> owner() {
        final Function function = new Function(FUNC_OWNER, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<String> serviceWallet() {
        final Function function = new Function(FUNC_SERVICEWALLET, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<TransactionReceipt> settleFunds(BigInteger _fundingId) {
        final Function function = new Function(
                FUNC_SETTLEFUNDS, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(_fundingId)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> toggleFundingActiveState(BigInteger _fundingId) {
        final Function function = new Function(
                FUNC_TOGGLEFUNDINGACTIVESTATE, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(_fundingId)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<String> token() {
        final Function function = new Function(FUNC_TOKEN, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    @Deprecated
    public static CrowdFunding load(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return new CrowdFunding(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static CrowdFunding load(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new CrowdFunding(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static CrowdFunding load(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return new CrowdFunding(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static CrowdFunding load(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new CrowdFunding(contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static RemoteCall<CrowdFunding> deploy(Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider, String _tokenAddress, String _serviceWallet) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, _tokenAddress), 
                new org.web3j.abi.datatypes.Address(160, _serviceWallet)));
        return deployRemoteCall(CrowdFunding.class, web3j, credentials, contractGasProvider, BINARY, encodedConstructor);
    }

    public static RemoteCall<CrowdFunding> deploy(Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider, String _tokenAddress, String _serviceWallet) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, _tokenAddress), 
                new org.web3j.abi.datatypes.Address(160, _serviceWallet)));
        return deployRemoteCall(CrowdFunding.class, web3j, transactionManager, contractGasProvider, BINARY, encodedConstructor);
    }

    @Deprecated
    public static RemoteCall<CrowdFunding> deploy(Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit, String _tokenAddress, String _serviceWallet) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, _tokenAddress), 
                new org.web3j.abi.datatypes.Address(160, _serviceWallet)));
        return deployRemoteCall(CrowdFunding.class, web3j, credentials, gasPrice, gasLimit, BINARY, encodedConstructor);
    }

    @Deprecated
    public static RemoteCall<CrowdFunding> deploy(Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit, String _tokenAddress, String _serviceWallet) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, _tokenAddress), 
                new org.web3j.abi.datatypes.Address(160, _serviceWallet)));
        return deployRemoteCall(CrowdFunding.class, web3j, transactionManager, gasPrice, gasLimit, BINARY, encodedConstructor);
    }
}
