package io.halpon.backend.service.impl;

import io.halpon.backend.domain.User;
import io.halpon.backend.service.UserService;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    private User user;

    @Override
    public User getUser() {
        return user;
    }

    @Override
    public void addUser(User user) {
        this.user = user;
    }
}
