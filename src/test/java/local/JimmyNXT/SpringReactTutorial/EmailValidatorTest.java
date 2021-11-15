package local.JimmyNXT.SpringReactTutorial;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

class EmailValidatorTest {
    private final EmailValidator underTest = new EmailValidator();

    @Test
    public void itShoultValidateCorrectEmail() {
        assertThat(underTest.test("hello@gmail.com")).isTrue();
    }

    @Test
    public void itShoultValidateIncorrectEmail() {
        assertThat(underTest.test("hellogmail.com")).isFalse();
    }

    @Test
    public void itShoultValidateIncorrectEmailWithoutDot() {
        assertThat(underTest.test("hello@gmail")).isFalse();
    }
}