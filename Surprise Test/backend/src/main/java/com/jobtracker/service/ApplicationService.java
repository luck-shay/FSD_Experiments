package com.jobtracker.service;

import com.jobtracker.dto.ApplicationDTO;
import com.jobtracker.dto.ApplicationRequest;
import com.jobtracker.dto.StatsDTO;
import com.jobtracker.entity.Application;
import com.jobtracker.entity.User;
import com.jobtracker.repository.ApplicationRepository;
import com.jobtracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;

    public ApplicationDTO createApplication(String userEmail, ApplicationRequest request) {
        // Validate input
        if (request.getCompany() == null || request.getCompany().trim().isEmpty()) {
            throw new IllegalArgumentException("Company name is required");
        }
        if (request.getRole() == null || request.getRole().trim().isEmpty()) {
            throw new IllegalArgumentException("Role is required");
        }
        if (request.getAppliedDate() == null) {
            throw new IllegalArgumentException("Applied date is required");
        }

        // Get user
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Create application
        Application application = new Application();
        application.setUserId(user.getId());
        application.setCompany(request.getCompany().trim());
        application.setRole(request.getRole().trim());
        application.setAppliedDate(request.getAppliedDate());
        application.setNotes(request.getNotes() != null ? request.getNotes().trim() : "");

        // Set status with validation
        if (request.getStatus() != null && !request.getStatus().trim().isEmpty()) {
            try {
                application.setStatus(Application.ApplicationStatus.valueOf(request.getStatus().toUpperCase().trim()));
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("Invalid status. Must be one of: APPLIED, INTERVIEW, OFFER, REJECTED");
            }
        } else {
            application.setStatus(Application.ApplicationStatus.APPLIED);
        }

        Application savedApplication = applicationRepository.save(application);
        return convertToDTO(savedApplication);
    }

    public List<ApplicationDTO> getAllApplications(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        List<Application> applications = applicationRepository.findByUserIdOrderByAppliedDateDesc(user.getId());
        return applications.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ApplicationDTO> getApplicationsByStatus(String userEmail, String status) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        try {
            Application.ApplicationStatus appStatus = Application.ApplicationStatus.valueOf(status.toUpperCase());
            List<Application> applications = applicationRepository
                    .findByUserIdAndStatusOrderByAppliedDateDesc(user.getId(), appStatus);
            return applications.stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid status");
        }
    }

    public List<ApplicationDTO> searchApplications(String userEmail, String company) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        List<Application> applications = applicationRepository
                .findByUserIdAndCompanyContainingIgnoreCaseOrderByAppliedDateDesc(user.getId(), company);
        return applications.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ApplicationDTO updateApplication(String userEmail, Integer applicationId, ApplicationRequest request) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Application application = applicationRepository.findByIdAndUserId(applicationId, user.getId())
                .orElseThrow(() -> new IllegalArgumentException("Application not found or unauthorized"));

        // Update fields
        if (request.getCompany() != null && !request.getCompany().trim().isEmpty()) {
            application.setCompany(request.getCompany().trim());
        }
        if (request.getRole() != null && !request.getRole().trim().isEmpty()) {
            application.setRole(request.getRole().trim());
        }
        if (request.getStatus() != null && !request.getStatus().trim().isEmpty()) {
            try {
                application.setStatus(Application.ApplicationStatus.valueOf(request.getStatus().toUpperCase().trim()));
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("Invalid status. Must be one of: APPLIED, INTERVIEW, OFFER, REJECTED");
            }
        }
        if (request.getAppliedDate() != null) {
            application.setAppliedDate(request.getAppliedDate());
        }
        if (request.getNotes() != null) {
            application.setNotes(request.getNotes().trim());
        }

        Application updatedApplication = applicationRepository.save(application);
        return convertToDTO(updatedApplication);
    }

    public void deleteApplication(String userEmail, Integer applicationId) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Application application = applicationRepository.findByIdAndUserId(applicationId, user.getId())
                .orElseThrow(() -> new IllegalArgumentException("Application not found or unauthorized"));

        applicationRepository.delete(application);
    }

    public StatsDTO getStats(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Integer userId = user.getId();
        Long totalApplications = (long) applicationRepository.findByUserIdOrderByAppliedDateDesc(userId).size();
        Long interviews = applicationRepository.countInterviewByUserId(userId);
        Long offers = applicationRepository.countOfferByUserId(userId);
        Long rejections = applicationRepository.countRejectedByUserId(userId);

        return new StatsDTO(totalApplications, interviews, offers, rejections);
    }

    private ApplicationDTO convertToDTO(Application application) {
        return new ApplicationDTO(
                application.getId(),
                application.getUserId(),
                application.getCompany(),
                application.getRole(),
                application.getStatus().name(),
                application.getAppliedDate(),
                application.getNotes()
        );
    }
}
