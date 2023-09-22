package com.stn.hpdp.service.blockchain;

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
import org.web3j.tuples.generated.Tuple7;
import org.web3j.tx.Contract;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.gas.ContractGasProvider;

import java.math.BigInteger;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.Callable;

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
    public static final String BINARY = "60806040523480156200001157600080fd5b50604051620013bf380380620013bf83398181016040528101906200003791906200016b565b816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050620001b2565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620001338262000106565b9050919050565b620001458162000126565b81146200015157600080fd5b50565b60008151905062000165816200013a565b92915050565b6000806040838503121562000185576200018462000101565b5b6000620001958582860162000154565b9250506020620001a88582860162000154565b9150509250929050565b6111fd80620001c26000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c80638da5cb5b1161005b5780638da5cb5b146100ff578063ccaf0a6a1461011d578063d13cb1fb14610139578063fc0c546a1461016f57610088565b806310c3e7051461008d5780635641f3c3146100a95780636816d1d1146100c75780638c590917146100e3575b600080fd5b6100a760048036038101906100a29190610a3a565b61018d565b005b6100b16104c5565b6040516100be9190610aa8565b60405180910390f35b6100e160048036038101906100dc9190610ac3565b6104eb565b005b6100fd60048036038101906100f89190610b16565b6106c9565b005b610107610854565b6040516101149190610aa8565b60405180910390f35b61013760048036038101906101329190610a3a565b61087a565b005b610153600480360381019061014e9190610a3a565b61095f565b6040516101669796959493929190610b80565b60405180910390f35b6101776109db565b6040516101849190610c4e565b60405180910390f35b60006003600083815260200190815260200160002090503373ffffffffffffffffffffffffffffffffffffffff168160010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610236576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161022d90610cc6565b60405180910390fd5b8060040160009054906101000a900460ff16610287576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161027e90610d32565b60405180910390fd5b8060040160019054906101000a900460ff16156102d9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102d090610d9e565b60405180910390fd5b806002015481600301541015610324576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161031b90610e0a565b60405180910390fd5b806005015442101561036b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161036290610e76565b60405180910390fd5b6000816003015490506000826003018190555060018260040160016101000a81548160ff02191690831515021790555060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd8360010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16846040518463ffffffff1660e01b815260040161043e93929190610e96565b6020604051808303816000875af115801561045d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104819190610ef9565b6104c0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104b790610f98565b60405180910390fd5b505050565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600073ffffffffffffffffffffffffffffffffffffffff166003600085815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610590576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161058790611004565b60405180910390fd5b600062015180826105a19190611053565b426105ac9190611095565b90506040518060e001604052808581526020013373ffffffffffffffffffffffffffffffffffffffff1681526020018481526020016000815260200160011515815260200160001515815260200182815250600360008681526020019081526020016000206000820151816000015560208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550604082015181600201556060820151816003015560808201518160040160006101000a81548160ff02191690831515021790555060a08201518160040160016101000a81548160ff02191690831515021790555060c0820151816005015590505050505050565b60006003600084815260200190815260200160002090508060040160009054906101000a900460ff16610731576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161072890610d32565b60405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd338360010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16856040518463ffffffff1660e01b81526004016107b293929190610e96565b6020604051808303816000875af11580156107d1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107f59190610ef9565b610834576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161082b90611115565b60405180910390fd5b818160030160008282546108489190611095565b92505081905550505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461090a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610901906111a7565b60405180910390fd5b6003600082815260200190815260200160002060040160009054906101000a900460ff16156003600083815260200190815260200160002060040160006101000a81548160ff02191690831515021790555050565b60036020528060005260406000206000915090508060000154908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020154908060030154908060040160009054906101000a900460ff16908060040160019054906101000a900460ff16908060050154905087565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600080fd5b6000819050919050565b610a1781610a04565b8114610a2257600080fd5b50565b600081359050610a3481610a0e565b92915050565b600060208284031215610a5057610a4f6109ff565b5b6000610a5e84828501610a25565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610a9282610a67565b9050919050565b610aa281610a87565b82525050565b6000602082019050610abd6000830184610a99565b92915050565b600080600060608486031215610adc57610adb6109ff565b5b6000610aea86828701610a25565b9350506020610afb86828701610a25565b9250506040610b0c86828701610a25565b9150509250925092565b60008060408385031215610b2d57610b2c6109ff565b5b6000610b3b85828601610a25565b9250506020610b4c85828601610a25565b9150509250929050565b610b5f81610a04565b82525050565b60008115159050919050565b610b7a81610b65565b82525050565b600060e082019050610b95600083018a610b56565b610ba26020830189610a99565b610baf6040830188610b56565b610bbc6060830187610b56565b610bc96080830186610b71565b610bd660a0830185610b71565b610be360c0830184610b56565b98975050505050505050565b6000819050919050565b6000610c14610c0f610c0a84610a67565b610bef565b610a67565b9050919050565b6000610c2682610bf9565b9050919050565b6000610c3882610c1b565b9050919050565b610c4881610c2d565b82525050565b6000602082019050610c636000830184610c3f565b92915050565b600082825260208201905092915050565b7f4f6e6c792062656e65666963696172792063616e20736574746c650000000000600082015250565b6000610cb0601b83610c69565b9150610cbb82610c7a565b602082019050919050565b60006020820190508181036000830152610cdf81610ca3565b9050919050565b7f46756e64696e67206973206e6f74206163746976650000000000000000000000600082015250565b6000610d1c601583610c69565b9150610d2782610ce6565b602082019050919050565b60006020820190508181036000830152610d4b81610d0f565b9050919050565b7f46756e647320616c726561647920736574746c65640000000000000000000000600082015250565b6000610d88601583610c69565b9150610d9382610d52565b602082019050919050565b60006020820190508181036000830152610db781610d7b565b9050919050565b7f476f616c206e6f74206d65742079657400000000000000000000000000000000600082015250565b6000610df4601083610c69565b9150610dff82610dbe565b602082019050919050565b60006020820190508181036000830152610e2381610de7565b9050919050565b7f446561646c696e65206e6f742072656163686564000000000000000000000000600082015250565b6000610e60601483610c69565b9150610e6b82610e2a565b602082019050919050565b60006020820190508181036000830152610e8f81610e53565b9050919050565b6000606082019050610eab6000830186610a99565b610eb86020830185610a99565b610ec56040830184610b56565b949350505050565b610ed681610b65565b8114610ee157600080fd5b50565b600081519050610ef381610ecd565b92915050565b600060208284031215610f0f57610f0e6109ff565b5b6000610f1d84828501610ee4565b91505092915050565b7f546f6b656e207472616e7366657220746f20736572766963652077616c6c657460008201527f206661696c656400000000000000000000000000000000000000000000000000602082015250565b6000610f82602783610c69565b9150610f8d82610f26565b604082019050919050565b60006020820190508181036000830152610fb181610f75565b9050919050565b7f46756e64696e6720494420616c72656164792065786973747300000000000000600082015250565b6000610fee601983610c69565b9150610ff982610fb8565b602082019050919050565b6000602082019050818103600083015261101d81610fe1565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061105e82610a04565b915061106983610a04565b925082820261107781610a04565b9150828204841483151761108e5761108d611024565b5b5092915050565b60006110a082610a04565b91506110ab83610a04565b92508282019050808211156110c3576110c2611024565b5b92915050565b7f546f6b656e207472616e73666572206661696c65640000000000000000000000600082015250565b60006110ff601583610c69565b915061110a826110c9565b602082019050919050565b6000602082019050818103600083015261112e816110f2565b9050919050565b7f4f6e6c79206f776e65722063616e20746f67676c652066756e64696e6720737460008201527f6174650000000000000000000000000000000000000000000000000000000000602082015250565b6000611191602383610c69565b915061119c82611135565b604082019050919050565b600060208201905081810360008301526111c081611184565b905091905056fea264697066735822122047be90df5d249e87989681f322362be4c84d642c84b82a7039ce54cfe469dfbc64736f6c63430008120033";

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

    public RemoteFunctionCall<TransactionReceipt> contribute(BigInteger _fundingId, BigInteger _amount) {
        final Function function = new Function(
                FUNC_CONTRIBUTE,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(_fundingId),
                        new org.web3j.abi.datatypes.generated.Uint256(_amount)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> createFunding(BigInteger _fundingId, BigInteger _goal, BigInteger _durationInDays) {
        final Function function = new Function(
                FUNC_CREATEFUNDING,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(_fundingId),
                        new org.web3j.abi.datatypes.generated.Uint256(_goal),
                        new org.web3j.abi.datatypes.generated.Uint256(_durationInDays)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<Tuple7<BigInteger, String, BigInteger, BigInteger, Boolean, Boolean, BigInteger>> fundings(BigInteger param0) {
        final Function function = new Function(FUNC_FUNDINGS,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(param0)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {
                }, new TypeReference<Address>() {
                }, new TypeReference<Uint256>() {
                }, new TypeReference<Uint256>() {
                }, new TypeReference<Bool>() {
                }, new TypeReference<Bool>() {
                }, new TypeReference<Uint256>() {
                }));
        return new RemoteFunctionCall<Tuple7<BigInteger, String, BigInteger, BigInteger, Boolean, Boolean, BigInteger>>(function,
                new Callable<Tuple7<BigInteger, String, BigInteger, BigInteger, Boolean, Boolean, BigInteger>>() {
                    @Override
                    public Tuple7<BigInteger, String, BigInteger, BigInteger, Boolean, Boolean, BigInteger> call() throws Exception {
                        List<Type> results = executeCallMultipleValueReturn(function);
                        return new Tuple7<BigInteger, String, BigInteger, BigInteger, Boolean, Boolean, BigInteger>(
                                (BigInteger) results.get(0).getValue(),
                                (String) results.get(1).getValue(),
                                (BigInteger) results.get(2).getValue(),
                                (BigInteger) results.get(3).getValue(),
                                (Boolean) results.get(4).getValue(),
                                (Boolean) results.get(5).getValue(),
                                (BigInteger) results.get(6).getValue());
                    }
                });
    }

    public RemoteFunctionCall<String> owner() {
        final Function function = new Function(FUNC_OWNER,
                Arrays.<Type>asList(),
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {
                }));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<String> serviceWallet() {
        final Function function = new Function(FUNC_SERVICEWALLET,
                Arrays.<Type>asList(),
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {
                }));
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
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {
                }));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }
}
