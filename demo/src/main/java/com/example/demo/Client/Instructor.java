package com.example.demo.Client;

import lombok.*;

@ToString
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class Instructor {
    private Long id;
    private String name;
    private String email;
    private Gender gender;
}
