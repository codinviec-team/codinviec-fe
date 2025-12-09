// Demo data for HR Management

export type JobStatus = "active" | "draft" | "closed" | "expired";

export interface HRJob {
  id: number;
  title: string;
  department: string;
  location: string;
  salary: string;
  experience: string;
  jobType: string;
  status: JobStatus;
  views: number;
  applications: number;
  postedAt: string;
  expiresAt: string;
  description: string;
  requirements: string[];
  benefits: string[];
  tags: string[];
}

export interface Candidate {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  position: string;
  experience: string;
  location: string;
  status: "new" | "reviewing" | "interviewing" | "accepted" | "rejected";
  appliedAt: string;
  appliedFor: string;
  jobId: number;
  resume?: string;
  coverLetter?: string;
  skills: string[];
  education: string;
  rating?: number;
}

export interface Application {
  id: number;
  candidateId: number;
  candidate: Candidate;
  jobId: number;
  jobTitle: string;
  status: "pending" | "reviewing" | "interview" | "accepted" | "rejected";
  appliedAt: string;
  notes?: string;
}

export interface HRStats {
  totalJobs: number;
  activeJobs: number;
  totalCandidates: number;
  newCandidates: number;
  totalViews: number;
  totalApplications: number;
  interviewScheduled: number;
  accepted: number;
  rejected: number;
}

// Demo Jobs Data
export const demoJobs: HRJob[] = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Hà Nội",
    salary: "25 - 40 triệu",
    experience: "3-5 năm",
    jobType: "Full-time",
    status: "active",
    views: 1250,
    applications: 45,
    postedAt: "2024-01-15",
    expiresAt: "2024-02-15",
    description: "Chúng tôi đang tìm kiếm một Senior Frontend Developer có kinh nghiệm với React, TypeScript và các công nghệ frontend hiện đại.",
    requirements: [
      "3-5 năm kinh nghiệm phát triển frontend",
      "Thành thạo React, TypeScript, Next.js",
      "Kinh nghiệm với TailwindCSS, Redux",
      "Hiểu biết về UI/UX design principles",
    ],
    benefits: [
      "Lương cạnh tranh",
      "Bảo hiểm đầy đủ",
      "Làm việc remote linh hoạt",
      "Đào tạo và phát triển nghề nghiệp",
    ],
    tags: ["ReactJS", "TypeScript", "Next.js", "TailwindCSS"],
  },
  {
    id: 2,
    title: "Backend Developer (NodeJS)",
    department: "Engineering",
    location: "Hồ Chí Minh",
    salary: "20 - 35 triệu",
    experience: "2-4 năm",
    jobType: "Full-time",
    status: "draft",
    views: 0,
    applications: 0,
    postedAt: "2024-01-14",
    expiresAt: "2024-02-14",
    description: "Tìm kiếm Backend Developer có kinh nghiệm với Node.js, MongoDB và microservices architecture.",
    requirements: [
      "2-4 năm kinh nghiệm backend development",
      "Thành thạo Node.js, Express",
      "Kinh nghiệm với MongoDB, Redis",
      "Hiểu biết về RESTful API, GraphQL",
    ],
    benefits: [
      "Lương cạnh tranh",
      "Thưởng theo dự án",
      "Môi trường làm việc năng động",
    ],
    tags: ["NodeJS", "MongoDB", "Redis", "Microservices"],
  },
  {
    id: 3,
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Hà Nội",
    salary: "30 - 50 triệu",
    experience: "3-5 năm",
    jobType: "Full-time",
    status: "active",
    views: 650,
    applications: 18,
    postedAt: "2024-01-13",
    expiresAt: "2024-02-13",
    description: "Tìm kiếm DevOps Engineer có kinh nghiệm với AWS, Docker, Kubernetes và CI/CD pipelines.",
    requirements: [
      "3-5 năm kinh nghiệm DevOps",
      "Thành thạo AWS, Docker, Kubernetes",
      "Kinh nghiệm với CI/CD (Jenkins, GitLab CI)",
      "Hiểu biết về Infrastructure as Code",
    ],
    benefits: [
      "Lương cao",
      "Bảo hiểm premium",
      "Làm việc remote",
      "Training budget",
    ],
    tags: ["AWS", "Docker", "Kubernetes", "CI/CD"],
  },
  {
    id: 4,
    title: "Mobile Developer (React Native)",
    department: "Engineering",
    location: "Hồ Chí Minh",
    salary: "22 - 38 triệu",
    experience: "2-4 năm",
    jobType: "Full-time",
    status: "closed",
    views: 420,
    applications: 12,
    postedAt: "2024-01-12",
    expiresAt: "2024-02-12",
    description: "Tìm kiếm Mobile Developer có kinh nghiệm phát triển ứng dụng mobile với React Native.",
    requirements: [
      "2-4 năm kinh nghiệm mobile development",
      "Thành thạo React Native",
      "Kinh nghiệm với iOS và Android",
      "Hiểu biết về mobile UI/UX",
    ],
    benefits: [
      "Lương cạnh tranh",
      "MacBook Pro",
      "Flexible hours",
    ],
    tags: ["React Native", "iOS", "Android", "Mobile"],
  },
  {
    id: 5,
    title: "Full Stack Developer",
    department: "Engineering",
    location: "Đà Nẵng",
    salary: "25 - 45 triệu",
    experience: "3-5 năm",
    jobType: "Full-time",
    status: "active",
    views: 890,
    applications: 32,
    postedAt: "2024-01-11",
    expiresAt: "2024-02-11",
    description: "Tìm kiếm Full Stack Developer có thể làm việc với cả frontend và backend.",
    requirements: [
      "3-5 năm kinh nghiệm full stack",
      "Thành thạo React, Node.js",
      "Kinh nghiệm với PostgreSQL, MongoDB",
      "Hiểu biết về cloud services",
    ],
    benefits: [
      "Lương cạnh tranh",
      "Remote work",
      "Learning budget",
    ],
    tags: ["React", "Node.js", "PostgreSQL", "Full Stack"],
  },
  {
    id: 6,
    title: "UI/UX Designer",
    department: "Design",
    location: "Hà Nội",
    salary: "18 - 30 triệu",
    experience: "2-4 năm",
    jobType: "Full-time",
    status: "active",
    views: 720,
    applications: 25,
    postedAt: "2024-01-10",
    expiresAt: "2024-02-10",
    description: "Tìm kiếm UI/UX Designer có kinh nghiệm thiết kế giao diện web và mobile.",
    requirements: [
      "2-4 năm kinh nghiệm UI/UX design",
      "Thành thạo Figma, Adobe XD",
      "Portfolio đẹp",
      "Hiểu biết về design systems",
    ],
    benefits: [
      "Lương cạnh tranh",
      "Design tools provided",
      "Creative freedom",
    ],
    tags: ["Figma", "UI/UX", "Design", "Prototyping"],
  },
  {
    id: 7,
    title: "Data Engineer",
    department: "Data",
    location: "Hồ Chí Minh",
    salary: "28 - 45 triệu",
    experience: "3-5 năm",
    jobType: "Full-time",
    status: "active",
    views: 580,
    applications: 15,
    postedAt: "2024-01-09",
    expiresAt: "2024-02-09",
    description: "Tìm kiếm Data Engineer có kinh nghiệm với big data technologies và data pipelines.",
    requirements: [
      "3-5 năm kinh nghiệm data engineering",
      "Thành thạo Python, SQL",
      "Kinh nghiệm với Spark, Hadoop",
      "Hiểu biết về data warehousing",
    ],
    benefits: [
      "Lương cao",
      "Data tools provided",
      "Conference attendance",
    ],
    tags: ["Python", "Spark", "Hadoop", "Data Engineering"],
  },
  {
    id: 8,
    title: "QA Engineer",
    department: "Quality Assurance",
    location: "Hà Nội",
    salary: "15 - 25 triệu",
    experience: "1-3 năm",
    jobType: "Full-time",
    status: "draft",
    views: 0,
    applications: 0,
    postedAt: "2024-01-08",
    expiresAt: "2024-02-08",
    description: "Tìm kiếm QA Engineer có kinh nghiệm testing và automation.",
    requirements: [
      "1-3 năm kinh nghiệm QA",
      "Thành thạo testing methodologies",
      "Kinh nghiệm với automation tools",
      "Attention to detail",
    ],
    benefits: [
      "Lương cạnh tranh",
      "Training provided",
      "Career growth",
    ],
    tags: ["QA", "Testing", "Automation", "Selenium"],
  },
];

// Demo Candidates Data
export const demoCandidates: Candidate[] = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "nguyenvana@email.com",
    phone: "0901234567",
    avatar: "https://i.pravatar.cc/150?img=1",
    position: "Senior Frontend Developer",
    experience: "4 năm",
    location: "Hà Nội",
    status: "new",
    appliedAt: "2024-01-16",
    appliedFor: "Senior Frontend Developer",
    jobId: 1,
    skills: ["React", "TypeScript", "Next.js", "TailwindCSS", "Redux"],
    education: "Đại học Bách Khoa Hà Nội - Công nghệ thông tin",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Trần Thị B",
    email: "tranthib@email.com",
    phone: "0902345678",
    avatar: "https://i.pravatar.cc/150?img=5",
    position: "Backend Developer",
    experience: "3 năm",
    location: "Hồ Chí Minh",
    status: "reviewing",
    appliedAt: "2024-01-15",
    appliedFor: "Backend Developer (NodeJS)",
    jobId: 2,
    skills: ["Node.js", "MongoDB", "Redis", "Express", "GraphQL"],
    education: "Đại học Khoa học Tự nhiên - Công nghệ thông tin",
    rating: 4.2,
  },
  {
    id: 3,
    name: "Lê Văn C",
    email: "levanc@email.com",
    phone: "0903456789",
    avatar: "https://i.pravatar.cc/150?img=12",
    position: "DevOps Engineer",
    experience: "5 năm",
    location: "Hà Nội",
    status: "interviewing",
    appliedAt: "2024-01-14",
    appliedFor: "DevOps Engineer",
    jobId: 3,
    skills: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform"],
    education: "Đại học Công nghệ - Kỹ thuật phần mềm",
    rating: 4.8,
  },
  {
    id: 4,
    name: "Phạm Thị D",
    email: "phamthid@email.com",
    phone: "0904567890",
    avatar: "https://i.pravatar.cc/150?img=9",
    position: "Mobile Developer",
    experience: "3 năm",
    location: "Hồ Chí Minh",
    status: "accepted",
    appliedAt: "2024-01-13",
    appliedFor: "Mobile Developer (React Native)",
    jobId: 4,
    skills: ["React Native", "iOS", "Android", "Redux", "Firebase"],
    education: "Đại học FPT - Công nghệ thông tin",
    rating: 4.6,
  },
  {
    id: 5,
    name: "Hoàng Văn E",
    email: "hoangvane@email.com",
    phone: "0905678901",
    avatar: "https://i.pravatar.cc/150?img=15",
    position: "Full Stack Developer",
    experience: "4 năm",
    location: "Đà Nẵng",
    status: "reviewing",
    appliedAt: "2024-01-12",
    appliedFor: "Full Stack Developer",
    jobId: 5,
    skills: ["React", "Node.js", "PostgreSQL", "MongoDB", "AWS"],
    education: "Đại học Đà Nẵng - Công nghệ thông tin",
    rating: 4.4,
  },
  {
    id: 6,
    name: "Vũ Thị F",
    email: "vuthif@email.com",
    phone: "0906789012",
    avatar: "https://i.pravatar.cc/150?img=20",
    position: "UI/UX Designer",
    experience: "3 năm",
    location: "Hà Nội",
    status: "new",
    appliedAt: "2024-01-11",
    appliedFor: "UI/UX Designer",
    jobId: 6,
    skills: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research"],
    education: "Đại học Mỹ thuật Công nghiệp - Thiết kế đồ họa",
    rating: 4.3,
  },
  {
    id: 7,
    name: "Đỗ Văn G",
    email: "dovang@email.com",
    phone: "0907890123",
    avatar: "https://i.pravatar.cc/150?img=33",
    position: "Data Engineer",
    experience: "4 năm",
    location: "Hồ Chí Minh",
    status: "interviewing",
    appliedAt: "2024-01-10",
    appliedFor: "Data Engineer",
    jobId: 7,
    skills: ["Python", "Spark", "Hadoop", "SQL", "Airflow"],
    education: "Đại học Bách Khoa TP.HCM - Khoa học máy tính",
    rating: 4.7,
  },
  {
    id: 8,
    name: "Bùi Thị H",
    email: "buithih@email.com",
    phone: "0908901234",
    avatar: "https://i.pravatar.cc/150?img=47",
    position: "QA Engineer",
    experience: "2 năm",
    location: "Hà Nội",
    status: "rejected",
    appliedAt: "2024-01-09",
    appliedFor: "QA Engineer",
    jobId: 8,
    skills: ["Manual Testing", "Selenium", "Jest", "Postman", "Test Planning"],
    education: "Đại học Thăng Long - Công nghệ thông tin",
    rating: 3.8,
  },
  {
    id: 9,
    name: "Ngô Văn I",
    email: "ngovani@email.com",
    phone: "0909012345",
    avatar: "https://i.pravatar.cc/150?img=52",
    position: "Frontend Developer",
    experience: "2 năm",
    location: "Hồ Chí Minh",
    status: "new",
    appliedAt: "2024-01-08",
    appliedFor: "Senior Frontend Developer",
    jobId: 1,
    skills: ["React", "JavaScript", "CSS", "HTML", "Vue.js"],
    education: "Đại học Kinh tế TP.HCM - Hệ thống thông tin",
    rating: 3.9,
  },
  {
    id: 10,
    name: "Đinh Thị K",
    email: "dinhthik@email.com",
    phone: "0900123456",
    avatar: "https://i.pravatar.cc/150?img=60",
    position: "Backend Developer",
    experience: "3 năm",
    location: "Hà Nội",
    status: "reviewing",
    appliedAt: "2024-01-07",
    appliedFor: "Backend Developer (NodeJS)",
    jobId: 2,
    skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "REST API"],
    education: "Đại học Công nghệ - Kỹ thuật phần mềm",
    rating: 4.1,
  },
];

// Demo Applications Data
export const demoApplications: Application[] = demoCandidates.map((candidate) => ({
  id: candidate.id,
  candidateId: candidate.id,
  candidate,
  jobId: candidate.jobId,
  jobTitle: candidate.appliedFor,
  status: candidate.status === "new" ? "pending" : 
          candidate.status === "reviewing" ? "reviewing" :
          candidate.status === "interviewing" ? "interview" :
          candidate.status === "accepted" ? "accepted" : "rejected",
  appliedAt: candidate.appliedAt,
  notes: candidate.status === "accepted" ? "Ứng viên xuất sắc, phù hợp với vị trí" :
          candidate.status === "rejected" ? "Không đủ kinh nghiệm yêu cầu" : undefined,
}));

// Demo Stats Data
export const demoHRStats: HRStats = {
  totalJobs: 8,
  activeJobs: 5,
  totalCandidates: 156,
  newCandidates: 28,
  totalViews: 8450,
  totalApplications: 156,
  interviewScheduled: 12,
  accepted: 8,
  rejected: 15,
};

// Helper functions
export const getJobsByStatus = (status: JobStatus) => {
  return demoJobs.filter((job) => job.status === status);
};

export const getCandidatesByStatus = (status: Candidate["status"]) => {
  return demoCandidates.filter((candidate) => candidate.status === status);
};

export const getApplicationsByJobId = (jobId: number) => {
  return demoApplications.filter((app) => app.jobId === jobId);
};

export const getCandidateById = (id: number) => {
  return demoCandidates.find((candidate) => candidate.id === id);
};

export const getJobById = (id: number) => {
  return demoJobs.find((job) => job.id === id);
};

