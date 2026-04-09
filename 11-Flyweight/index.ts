class RegistrationSystem {
  private enrollments: Enrollment[] = [];

  public addEnrollment(
    studentId: string,
    semester: string,
    code: string,
    name: string,
    credit: number,
    grade?: string,
  ): void {
    const course = courseFactory.getCourse(code, name, credit);
    const enrollment = new Enrollment(studentId, semester, grade, course);
    this.enrollments.push(enrollment);
  }

  public showAllEnrollments(): void {
    for (const e of this.enrollments) {
      e.show();
    }
  }

  public calculateGPA(studentId: string): void {
    let totalPoints = 0;
    let totalCredits = 0;
    let hasEnrollment = false;

    for (const e of this.enrollments) {
      if (e.getStudentId() === studentId) {
        totalPoints += e.getTotalPoints();
        totalCredits += e.getCourse().getCredit();
        hasEnrollment = true;
      }
    }

    if (!hasEnrollment) {
      console.log(`ไม่พบข้อมูลการลงทะเบียนของรหัสนักศึกษา: ${studentId}`);
      return;
    }

    const gpa = totalCredits === 0 ? 0 : totalPoints / totalCredits;
    console.log(`GPA of Student ${studentId}: ${gpa.toFixed(2)}`);
  }
}

class Course {
  constructor(
    private readonly code: string,
    private readonly name: string,
    private readonly credit: number,
  ) {}

  getCode(): string {
    return this.code;
  }
  getName(): string {
    return this.name;
  }
  getCredit(): number {
    return this.credit;
  }

  public calculateGradePoint(grade: string | undefined): number {
    const gradePoint = { A: 4, B: 3, C: 2, D: 1, F: 0 }[grade ?? ""] ?? 0;
    return gradePoint * this.getCredit();
  }

  pickEnrollInfo(
    studentId: string,
    semester: string,
    grade: string | undefined,
  ): string {
    const base = `Student: ${studentId} | Course: ${this.code} (${this.name}) | Semester: ${semester}`;
    const gradePoint = { A: 4, B: 3, C: 2, D: 1, F: 0 }[grade ?? ""] ?? 0;
    const passed = gradePoint > 0 ? "Yes" : "No";
    return `${base} -> Grade: ${grade ?? "N/A"} | Passed: ${passed}`;
  }
}

class CourseFactory {
  private pool: Map<string, Course> = new Map();

  getCourse(code: string, name: string, credit: number): Course {
    if (!this.pool.has(code)) {
      console.log(`📦 Creating course (New Flyweight): ${code}`);
      this.pool.set(code, new Course(code, name, credit));
    }
    return this.pool.get(code)!;
  }

  poolSize(): number {
    return this.pool.size;
  }
}

class Enrollment {
  constructor(
    private studentId: string,
    private semester: string,
    private grade: string | undefined,
    private course: Course,
  ) {}

  getGradePoint(): number {
    const map: Record<string, number> = { A: 4, B: 3, C: 2, D: 1, F: 0 };
    return map[this.grade ?? ""] ?? 0;
  }

  getCourse(): Course {
    return this.course;
  }

  setCourse(course: Course): void {
    this.course = course;
  }

  getStudentId(): string {
    return this.studentId;
  }

  getSemester(): string {
    return this.semester;
  }

  getGrade(): string | undefined {
    return this.grade;
  }

  getTotalPoints(): number {
    return this.course.calculateGradePoint(this.grade);
  }

  show(): void {
    console.log(
      this.course.pickEnrollInfo(this.getStudentId(), this.getSemester(), this.getGrade()),
    );
  }
}
const system = new RegistrationSystem();
const courseFactory = new CourseFactory();

const course1 = courseFactory.getCourse("COS4311", "Design Patterns", 3);
const course2 = courseFactory.getCourse("COS2104", "Assembly Language Programming", 3);
const course3 = courseFactory.getCourse("COS4311", "Design Patterns", 3);
const course4 = courseFactory.getCourse("COS2101", "Procedural Programming", 3);
const course5 = courseFactory.getCourse("COS3401", "Image Processing", 3);

console.log(`Course1 and Course3 are the same instance: ${course1 === course3}`);



system.addEnrollment("66003", "2/68", "COS4311", "Design Patterns", 3, "A");
system.addEnrollment("66004","2/68","COS2104","Assembly Language Programming",3,"B");
system.addEnrollment("66005", "1/69", "COS4311", "Design Patterns", 3, "C");
system.addEnrollment("66006", "1/69", "COS4311", "Design Patterns", 3, "F");

system.addEnrollment("66007", "2/68", "COS2101", "Procedural Programming", 3, "B");
system.addEnrollment("66007", "2/68", "COS2104", "Assembly Language Programming", 3, "A");
system.addEnrollment("66007", "2/68", "COS3401", "Image Processing", 3, "A");
system.addEnrollment("66007", "2/68", "COS4311", "Design Patterns", 3, "B");

console.log("\n--- รายละเอียดการลงทะเบียน ---");
system.showAllEnrollments();

console.log("\n--- สรุปผล ---");
console.log(`จำนวนออบเจกต์วิชาที่ถูกสร้างจริงๆ (Flyweight Pool Size): ${courseFactory.poolSize()}`);
system.calculateGPA("66007");