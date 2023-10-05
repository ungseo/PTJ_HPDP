package com.stn.hpdp.controller;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.stn.hpdp.common.AwsS3Uploader;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Slf4j
@RestController
@RequestMapping("/api/hello")
@RequiredArgsConstructor
public class HelloController {

    private final AmazonS3Client amazonS3Client;
    private final AwsS3Uploader awsS3Uploader;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @GetMapping(value = "")
    public ResponseEntity<String> hello(){
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            String fileName=file.getOriginalFilename();
            //String fileUrl= "https://" + bucket + "/test" +fileName;
            ObjectMetadata metadata= new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());
            amazonS3Client.putObject(bucket, fileName, file.getInputStream(), metadata);
            return ResponseEntity.ok("Success");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/uploader")
    public ResponseEntity<String> uploadFileUploader(@RequestParam("file") MultipartFile file) {
        try {
            String thumbnailUrl = awsS3Uploader.uploadFile(file, "funding");
            return ResponseEntity.ok(thumbnailUrl);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
