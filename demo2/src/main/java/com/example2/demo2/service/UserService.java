package com.example2.demo2.service;

import com.example2.demo2.dto.UserDTO;
import com.example2.demo2.model.User;
import com.example2.demo2.repo.UserRepo;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public UserDTO saveUser(UserDTO userDTO){
        // Encrypt password before saving
        userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        userRepo.save(modelMapper.map(userDTO, User.class));
        return userDTO;
    }

    public boolean authenticateUser(String email, String rawPassword) {
        Optional<User> user = userRepo.findByEmail(email);
        return user.isPresent() && passwordEncoder.matches(rawPassword, user.get().getPassword());
    }

    public List<UserDTO> getAllUsers(){
        List<User> userList = userRepo.findAll();
        return modelMapper.map(userList, new TypeToken<List<UserDTO>>() {}.getType());
    }

    public UserDTO updateUser(UserDTO userDTO){
        userRepo.save(modelMapper.map(userDTO, User.class));
        return userDTO;
    }

    public String deleteUser(Long id){
        userRepo.deleteById(id);
        return "User deleted successfully";
    }

    public UserDTO getUserById(Long id){
        User user = userRepo.getUserById(id);
        return modelMapper.map(user, UserDTO.class);
    }

    public UserDTO registerUser(UserDTO userDTO) {
        User user = modelMapper.map(userDTO, User.class);

        // Hash the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // If role is not provided, default to MANAGER
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("MANAGER");
        }

        userRepo.save(user);
        return modelMapper.map(user, UserDTO.class);
    }
}
