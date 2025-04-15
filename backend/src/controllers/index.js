const TagController = require("./tags/tag.controller");
const TagService = require("../services/tags/tag.service");
const Tag = require("../models/tag");
const StudentController = require("./students/student.controller");
const StudentService = require("../services/students/student.service");
const Student = require("../models/student");
const CompanyController = require("./companies/company.controller");
const CompanyService = require("../services/companies/company.service");
const Company = require("../models/company");
const ChallengeController = require("./challenges/challenge.controller");
const ChallengeService = require("../services/challenges/challenge.service");
const Challenge = require("../models/challenge");
const HackathonController = require("./hackathons/hackathon.controller");
const HackathonService = require("../services/hackathons/hackathon.service");
const Hackathon = require("../models/hackathon");
const CourseController = require("./courses/course.controller");
const CourseService = require("../services/courses/course.service");
const Course = require("../models/course");
const FieldController = require("./fields/field.controller");
const FieldService = require("../services/fields/field.service");
const Field = require("../models/field");
const RankingController = require("./rankings/ranking.controller");
const RankingService = require("../services/rankings/ranking.service");
const Ranking = require("../models/ranking");
const SubmissionController = require("./submissions/submission.controller");
const SubmissionService = require("../services/submissions/submission.service");
const Submission = require("../models/submission");

module.exports = [
  {
    Controller: TagController,
    Service: TagService,
    Model: Tag,
  },
  {
    Controller: StudentController,
    Service: StudentService,
    Model: Student,
  },
  {
    Controller: CompanyController,
    Service: CompanyService,
    Model: Company,
  },
  {
    Controller: ChallengeController,
    Service: ChallengeService,
    Model: Challenge,
  },
  {
    Controller: HackathonController,
    Service: HackathonService,
    Model: Hackathon,
  },
  {
    Controller: CourseController,
    Service: CourseService,
    Model: Course,
  },
  {
    Controller: FieldController,
    Service: FieldService,
    Model: Field,
  },
  {
    Controller: RankingController,
    Service: RankingService,
    Model: Ranking,
  },
  {
    Controller: SubmissionController,
    Service: SubmissionService,
    Model: Submission,
  },
];
