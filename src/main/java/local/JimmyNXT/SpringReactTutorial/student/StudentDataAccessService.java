package local.JimmyNXT.SpringReactTutorial.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Repository
public class StudentDataAccessService {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public StudentDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Student> selectAllStudents(){
        String sql = ""+
                "SELECT " +
                    "student_id, " +
                    "first_name, " +
                    "last_name, " +
                    "email, " +
                    "gender " +
                "FROM student;";

       return jdbcTemplate.query(sql, mapStudentFromDB());
    }

    public int insertStudent(UUID studentId, Student student) {
        String sql = "" +
                "INSERT INTO student " +
                    "(student_id, " +
                    "first_name, " +
                    "last_name, " +
                    "email, " +
                    "gender)" +
                "VALUES (?,?,?,?,?);";

        return jdbcTemplate.update(
                sql,
                studentId,
                student.getFirstName(),
                student.getLastName(),
                student.getEmail(),
                student.getGender().name().toUpperCase());
    }

    @SuppressWarnings({"ConstantConditions", "SameReturnValue"})
    public boolean isEmailTaken(String email){
        String sql = "" +
                "SELECT EXISTS ( " +
                    "SELECT 1 " +
                    "FROM student " +
                    "WHERE email = ? " +
                ");";
        return jdbcTemplate.queryForObject(sql, new Object[] {email}, (restultSet, i) -> restultSet.getBoolean(1));
    }

    private RowMapper<Student> mapStudentFromDB() {
        return (resultSet, i) -> {

             String studentIdStr = resultSet.getString("student_id");
             UUID student_id = UUID.fromString(studentIdStr);

             String first_name = resultSet.getString("first_name");
             String last_name = resultSet.getString("last_name");
             String email = resultSet.getString("email");

             String genderstr = resultSet.getString("gender").toUpperCase();
             Student.Gender gender = Student.Gender.valueOf(genderstr);

             return new Student(student_id,first_name,last_name,email,gender);
         };
    }


}
