package local.JimmyNXT.SpringReactTutorial.student;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("students")
public class StudentController {

    @GetMapping
    public List<Student> getAllStudents(){

        ArrayList<Student> Students = new ArrayList<Student>();

        Students.add(new Student(UUID.randomUUID(), "James", "Bond", "Example@test.com", Student.Gender.MALE));
        Students.add(new Student(UUID.randomUUID(), "Elisa", "Tamara", "Example@hotmail.com", Student.Gender.FEMALE));

        return Students;
    }
}
