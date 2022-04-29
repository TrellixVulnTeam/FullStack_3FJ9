package com.example.demo.Client;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/instructors")
public class ClientController {

    @GetMapping
    public List<Instructor> getAllClients(){
        List<Instructor> instructors = Arrays.asList(
                new Instructor(
                        1L,
                        "Jemalion",
                        "jemailion@aghedu.pl",
                        Gender.MALE),
                new Instructor(
                        2L,
                        "Bronker",
                        "badonker@aghedu.pl",
                        Gender.MALE
                )
        );
        return instructors;
    }
}
