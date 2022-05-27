package com.example.demo.Client;

import lombok.*;

@ToString// lombok annotations
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private Long id;
    private String name;
    private String email;
    private Gender gender;
}
