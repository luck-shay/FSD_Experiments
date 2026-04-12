package com.jobtracker.repository;

import com.jobtracker.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Integer> {
    
    List<Application> findByUserIdOrderByAppliedDateDesc(Integer userId);
    
    List<Application> findByUserIdAndStatusOrderByAppliedDateDesc(Integer userId, Application.ApplicationStatus status);
    
    List<Application> findByUserIdAndCompanyContainingIgnoreCaseOrderByAppliedDateDesc(Integer userId, String company);
    
    Optional<Application> findByIdAndUserId(Integer id, Integer userId);
    
    @Query("SELECT COUNT(a) FROM Application a WHERE a.userId = :userId AND a.status = 'APPLIED'")
    Long countAppliedByUserId(@Param("userId") Integer userId);
    
    @Query("SELECT COUNT(a) FROM Application a WHERE a.userId = :userId AND a.status = 'INTERVIEW'")
    Long countInterviewByUserId(@Param("userId") Integer userId);
    
    @Query("SELECT COUNT(a) FROM Application a WHERE a.userId = :userId AND a.status = 'OFFER'")
    Long countOfferByUserId(@Param("userId") Integer userId);
    
    @Query("SELECT COUNT(a) FROM Application a WHERE a.userId = :userId AND a.status = 'REJECTED'")
    Long countRejectedByUserId(@Param("userId") Integer userId);
}
