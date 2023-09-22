package com.stn.hpdp.controller.funding.request;

import com.stn.hpdp.model.entity.Budget;
import com.stn.hpdp.model.entity.Company;
import com.stn.hpdp.model.entity.Funding;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class SettleFundingReq {

    private Long fundingId;
}
