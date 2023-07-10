package com.mingyuesun.springbootecommerce.requestmodels;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegistrationRequest {

    @NotNull
    @NotBlank
    @Size(min = 3, max = 255)
    private String username;

    @NotNull
    @NotBlank
    @Email
    private String email;

    @NotNull
    @NotBlank
//    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$")
    @Size(min = 6, max = 32)
    private String password;

//    @NotNull
//    @NotBlank
//    private String firstName;
//
//    @NotNull
//    private String lastName;

}
