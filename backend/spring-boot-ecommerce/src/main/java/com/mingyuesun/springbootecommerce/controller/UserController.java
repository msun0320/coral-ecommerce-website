package com.mingyuesun.springbootecommerce.controller;

import com.mingyuesun.springbootecommerce.entity.User;
import com.mingyuesun.springbootecommerce.exception.UserAlreadyExistsException;
import com.mingyuesun.springbootecommerce.requestmodels.LoginRequest;
import com.mingyuesun.springbootecommerce.responsemodels.LoginResponse;
import com.mingyuesun.springbootecommerce.requestmodels.RegistrationRequest;
import com.mingyuesun.springbootecommerce.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("https://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity registerUser(@Valid @RequestBody RegistrationRequest registrationRequest) {
        try {
            userService.registerUser(registrationRequest);
            return ResponseEntity.ok().build();
        } catch (UserAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity loginUser(@Valid @RequestBody LoginRequest loginRequest) {
        String jwt = userService.loginUser(loginRequest);
        if (jwt == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } else {
            LoginResponse response = new LoginResponse();
            response.setJwt(jwt);
            return ResponseEntity.ok(response);
        }
    }

    @GetMapping("/me")
    public User getLoggedInUserProfile(@AuthenticationPrincipal User user) {
        return user;
    }

}
