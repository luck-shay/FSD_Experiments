-- Job Application Tracker Database Schema

CREATE DATABASE IF NOT EXISTS job_tracker_db;
USE job_tracker_db;

-- Users Table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email)
);

-- Applications Table
CREATE TABLE applications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    company VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    status ENUM('APPLIED', 'INTERVIEW', 'OFFER', 'REJECTED') DEFAULT 'APPLIED',
    applied_date DATE NOT NULL,
    notes LONGTEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_status (status),
    INDEX idx_applied_date (applied_date)
);

-- Insert Dummy Data
INSERT INTO users (name, email, password, role) VALUES
('Demo User', 'demo@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/KFm', 'USER');

-- Note: Password hash above is for 'password123' using BCrypt
-- Get actual user_id from the inserted user
SET @user_id = LAST_INSERT_ID();

INSERT INTO applications (user_id, company, role, status, applied_date, notes) VALUES
(@user_id, 'Amazon', 'SDE-2', 'APPLIED', CURDATE() - INTERVAL 10 DAY, 'Strong company, good learning opportunity'),
(@user_id, 'Google', 'Senior Software Engineer', 'INTERVIEW', CURDATE() - INTERVAL 5 DAY, 'Phone screen passed, next round scheduled'),
(@user_id, 'Microsoft', 'Software Engineer', 'REJECTED', CURDATE() - INTERVAL 15 DAY, 'Feedback: Need more systems design experience'),
(@user_id, 'Flipkart', 'Backend Engineer', 'OFFER', CURDATE() - INTERVAL 3 DAY, 'Offer received! 15% better than expected');
