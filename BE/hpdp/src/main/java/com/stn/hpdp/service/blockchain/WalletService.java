package com.stn.hpdp.service.blockchain;

import com.stn.hpdp.model.repository.WalletRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class WalletService {

    private final WalletRepository walletRepository;


}
