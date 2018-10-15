package io.halpon.backend.service.impl;

import io.halpon.backend.domain.Role;
import io.halpon.backend.domain.User;
import io.halpon.backend.service.UserService;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Override
    public User getUser() {
        return User.builder()
                .id(0L)
                .fullName("Name")
                .address("Address")
                .role(Role.ROLE_GETTER)
                .build();
    }
}
