package com.jobtracker.controller;

import com.jobtracker.dto.ApplicationDTO;
import com.jobtracker.dto.ApplicationRequest;
import com.jobtracker.dto.StatsDTO;
import com.jobtracker.security.JwtUtil;
import com.jobtracker.service.ApplicationService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/applications")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ApplicationController {

    private final ApplicationService applicationService;
    private final JwtUtil jwtUtil;

    @PostMapping
    public ResponseEntity<?> createApplication(
            HttpServletRequest request,
            @RequestBody ApplicationRequest applicationRequest) {
        try {
            String userEmail = extractEmailFromRequest(request);
            ApplicationDTO application = applicationService.createApplication(userEmail, applicationRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(application);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Failed to create application"));
        }
    }

    @GetMapping
    public ResponseEntity<?> getApplications(
            HttpServletRequest request) {
        try {
            String userEmail = extractEmailFromRequest(request);
            List<ApplicationDTO> applications = applicationService.getAllApplications(userEmail);
            return ResponseEntity.ok(applications);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Failed to fetch applications"));
        }
    }

    @GetMapping(params = "status")
    public ResponseEntity<?> getApplicationsByStatus(
            HttpServletRequest request,
            @RequestParam String status) {
        try {
            String userEmail = extractEmailFromRequest(request);
            List<ApplicationDTO> applications = applicationService.getApplicationsByStatus(userEmail, status);
            return ResponseEntity.ok(applications);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Failed to fetch applications"));
        }
    }

    @GetMapping(params = "company")
    public ResponseEntity<?> searchApplications(
            HttpServletRequest request,
            @RequestParam String company) {
        try {
            String userEmail = extractEmailFromRequest(request);
            List<ApplicationDTO> applications = applicationService.searchApplications(userEmail, company);
            return ResponseEntity.ok(applications);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Failed to search applications"));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateApplication(
            HttpServletRequest request,
            @PathVariable Integer id,
            @RequestBody ApplicationRequest applicationRequest) {
        try {
            String userEmail = extractEmailFromRequest(request);
            ApplicationDTO application = applicationService.updateApplication(userEmail, id, applicationRequest);
            return ResponseEntity.ok(application);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Failed to update application"));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteApplication(
            HttpServletRequest request,
            @PathVariable Integer id) {
        try {
            String userEmail = extractEmailFromRequest(request);
            applicationService.deleteApplication(userEmail, id);
            return ResponseEntity.ok(Map.of("message", "Application deleted successfully"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Failed to delete application"));
        }
    }

    @GetMapping("/stats")
    public ResponseEntity<?> getStats(
            HttpServletRequest request) {
        try {
            String userEmail = extractEmailFromRequest(request);
            StatsDTO stats = applicationService.getStats(userEmail);
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Failed to fetch stats"));
        }
    }

    private String extractEmailFromRequest(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new IllegalArgumentException("Invalid authorization header");
        }
        String token = authHeader.substring(7);
        return jwtUtil.extractEmail(token);
    }
}
