package local.JimmyNXT.SpringReactTutorial.student;

import local.JimmyNXT.SpringReactTutorial.exception.ApiRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("students")
public class StudentController {

    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public List<Student> getAllStudents(){
        return studentService.getAllStudents();
    }

    @PostMapping(consumes= MediaType.APPLICATION_JSON_VALUE)
    public void addNewStudent(@RequestBody @Valid Student student){
        studentService.addNewStudent(student);
    }
}
