CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  keycloak_sub VARCHAR(255) UNIQUE,
  username VARCHAR(150),
  display_name VARCHAR(255),
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE lessons (
  id SERIAL PRIMARY KEY,
  course_id INT REFERENCES courses(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  position INT DEFAULT 0
);

CREATE TABLE exercises (
  id SERIAL PRIMARY KEY,
  lesson_id INT REFERENCES lessons(id) ON DELETE CASCADE,
  prompt TEXT,
  language VARCHAR(50),
  sample_input TEXT,
  sample_output TEXT
);

CREATE TABLE submissions (
  id SERIAL PRIMARY KEY,
  exercise_id INT REFERENCES exercises(id) ON DELETE CASCADE,
  user_id INT REFERENCES users(id) ON DELETE SET NULL,
  code TEXT,
  result JSONB,
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE enrollments (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  course_id INT REFERENCES courses(id),
  enrolled_at TIMESTAMP DEFAULT now()
);
