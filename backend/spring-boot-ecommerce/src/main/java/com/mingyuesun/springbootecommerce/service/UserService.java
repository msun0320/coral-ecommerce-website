package com.mingyuesun.springbootecommerce.service;

import com.mingyuesun.springbootecommerce.dao.UserRepository;
import com.mingyuesun.springbootecommerce.entity.User;
import com.mingyuesun.springbootecommerce.exception.UserAlreadyExistsException;
import com.mingyuesun.springbootecommerce.requestmodels.LoginRequest;
import com.mingyuesun.springbootecommerce.requestmodels.RegistrationRequest;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private UserRepository userRepository;

    private EncryptionService encryptionService;

    private JWTService jwtService;

    public UserService(UserRepository userRepository, EncryptionService encryptionService, JWTService jwtService) {
        this.userRepository = userRepository;
        this.encryptionService = encryptionService;
        this.jwtService = jwtService;
    }

    public User registerUser(@Valid RegistrationRequest registrationBody) throws UserAlreadyExistsException {
        if (userRepository.findByEmail(registrationBody.getEmail()).isPresent()
                || userRepository.findByUsername(registrationBody.getUsername()).isPresent()) {
            throw new UserAlreadyExistsException();
        }
        User user = new User();
        user.setEmail(registrationBody.getEmail());
//        user.setFirstName(registrationBody.getFirstName());
//        user.setLastName(registrationBody.getLastName());
        user.setUsername(registrationBody.getUsername());
        user.setPassword(encryptionService.encryptPassword(registrationBody.getPassword()));
        return userRepository.save(user);
    }

    public String loginUser(LoginRequest loginRequest) {
        Optional<User> User = userRepository.findByUsername(loginRequest.getUsername());
        if (User.isPresent()) {
            User user = User.get();
            if (encryptionService.verifyPassword(loginRequest.getPassword(), user.getPassword())) {
                return jwtService.generateJWT(user);
            }
        }
        return null;
    }

}
