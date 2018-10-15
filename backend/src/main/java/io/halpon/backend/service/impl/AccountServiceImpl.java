package io.halpon.backend.service.impl;

import io.halpon.backend.domain.User;
import io.halpon.backend.service.AuthService;
import io.halpon.backend.service.RegistrationService;
import io.halpon.backend.service.UserService;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

@Service
@Log4j2
public class AccountServiceImpl implements RegistrationService {

    private final UserService userService;
    private final AuthService authService;

    public AccountServiceImpl(UserService userService, AuthService authService) {
        this.userService = userService;
        this.authService = authService;
    }

    @Override
    public User registerUser(User user) {
        //TODO smart contract call

        //mock
        userService.addUser(user);
        authService.auth();
        return user;
    }
}
