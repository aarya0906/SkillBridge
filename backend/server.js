require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");

const app = express();

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Test MySQL connection
db.connect((err) => {
    if (err) {
        console.error("MySQL connection failed:", err.message);
        return;
    }

    console.log("MySQL connected successfully!");
});

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "SkillBridge Backend is running!"
    });
});

// API test route
app.get("/api/test", (req, res) => {
    res.json({
        success: true,
        message: "Frontend and Backend are connected!"
    });
});

// Register user
app.post("/api/register", async (req, res) => {
    const { name, email, password, accountType } = req.body;

    try {
        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `
            INSERT INTO users (name, email, password, account_type)
            VALUES (?, ?, ?, ?)
        `;

        db.query(
            sql,
            [name, email, hashedPassword, accountType],
            (err, result) => {
                if (err) {
                    console.error(err);

                    if (err.code === "ER_DUP_ENTRY") {
                        return res.status(400).json({
                            success: false,
                            message: "Email already registered."
                        });
                    }

                    return res.status(500).json({
                        success: false,
                        message: "Registration failed."
                    });
                }

                res.json({
                    success: true,
                    message: "Registration successful!"
                });
            }
        );

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Something went wrong."
        });
    }
});

// Login user
app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], async (err, results) => {
        if (err) {
            console.error(err);

            return res.status(500).json({
                success: false,
                message: "Database error."
            });
        }

        if (results.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        const user = results[0];

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        res.json({
            success: true,
            message: "Login successful!",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                accountType: user.account_type
            }
        });
    });
});

// Get all projects
app.get("/api/projects", (req, res) => {
    const sql = "SELECT * FROM projects ORDER BY created_at DESC";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching projects:", err);

            return res.status(500).json({
                success: false,
                message: "Failed to fetch projects."
            });
        }

        res.json({
            success: true,
            projects: results
        });
    });
});

// Get single project by ID
app.get("/api/projects/:id", (req, res) => {
    const projectId = req.params.id;

    const sql = "SELECT * FROM projects WHERE id = ?";

    db.query(sql, [projectId], (err, results) => {
        if (err) {
            console.error("Error fetching project:", err);

            return res.status(500).json({
                success: false,
                message: "Failed to fetch project."
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Project not found."
            });
        }

        res.json({
            success: true,
            project: results[0]
        });
    });
});

// Post a new project
app.post("/api/projects", (req, res) => {
    const { user_id, title, category, description } = req.body;

    if (!user_id || !title || !category || !description) {
        return res.status(400).json({
            success: false,
            message: "All project fields are required."
        });
    }

    // Check that the user exists
    const userSql = `
        SELECT id, name, account_type
        FROM users
        WHERE id = ?
    `;

    db.query(userSql, [user_id], (err, users) => {

        if (err) {
            console.error("Error checking company:", err);

            return res.status(500).json({
                success: false,
                message: "Database error."
            });
        }

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Company account not found."
            });
        }

        const company = users[0];

        // Only companies can post projects
        if (company.account_type !== "company") {
            return res.status(403).json({
                success: false,
                message: "Only company accounts can post projects."
            });
        }

        // Insert project
        const projectSql = `
            INSERT INTO projects
            (user_id, title, company_name, category, description)
            VALUES (?, ?, ?, ?, ?)
        `;

        db.query(
            projectSql,
            [
                company.id,
                title,
                company.name,
                category,
                description
            ],
            (err, result) => {

                if (err) {
                    console.error("Error posting project:", err);

                    return res.status(500).json({
                        success: false,
                        message: "Failed to post project."
                    });
                }

                res.status(201).json({
                    success: true,
                    message: "Project posted successfully!",
                    projectId: result.insertId
                });
            }
        );
    });
});
// Apply to a project
app.post("/api/applications", (req, res) => {
    const { project_id, student_id } = req.body;

    if (!project_id || !student_id) {
        return res.status(400).json({
            success: false,
            message: "Project ID and Student ID are required."
        });
    }

    // Check if the user is a student
    const userSql = `
        SELECT id, name, account_type
        FROM users
        WHERE id = ?
    `;

    db.query(userSql, [student_id], (err, users) => {
        if (err) {
            console.error("Error checking student:", err);

            return res.status(500).json({
                success: false,
                message: "Database error."
            });
        }

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Student account not found."
            });
        }

        if (users[0].account_type !== "student") {
            return res.status(403).json({
                success: false,
                message: "Only students can apply to projects."
            });
        }

        // Check if project exists
        const projectSql = `
            SELECT id
            FROM projects
            WHERE id = ?
        `;

        db.query(projectSql, [project_id], (err, projects) => {
            if (err) {
                console.error("Error checking project:", err);

                return res.status(500).json({
                    success: false,
                    message: "Database error."
                });
            }

            if (projects.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Project not found."
                });
            }

            // Check if student already applied
            const existingSql = `
                SELECT id
                FROM applications
                WHERE project_id = ? AND student_id = ?
            `;

            db.query(
                existingSql,
                [project_id, student_id],
                (err, existing) => {
                    if (err) {
                        console.error("Error checking application:", err);

                        return res.status(500).json({
                            success: false,
                            message: "Database error."
                        });
                    }

                    if (existing.length > 0) {
                        return res.status(409).json({
                            success: false,
                            message: "You have already applied to this project."
                        });
                    }

                    // Create application
                    const insertSql = `
                        INSERT INTO applications
                        (project_id, student_id, status)
                        VALUES (?, ?, 'pending')
                    `;

                    db.query(
                        insertSql,
                        [project_id, student_id],
                        (err, result) => {
                            if (err) {
                                console.error(
                                    "Error creating application:",
                                    err
                                );

                                return res.status(500).json({
                                    success: false,
                                    message: "Failed to apply to project."
                                });
                            }

                            res.status(201).json({
                                success: true,
                                message: "Application submitted successfully!",
                                applicationId: result.insertId
                            });
                        }
                    );
                }
            );
        });
    });
});
// Get applications for a company's projects
app.get("/api/company/applications/:companyId", (req, res) => {
    const companyId = req.params.companyId;

    const sql = `
        SELECT
            applications.id AS application_id,
            applications.status,
            applications.applied_at,
            projects.id AS project_id,
            projects.title AS project_title,
            users.id AS student_id,
            users.name AS student_name,
            users.email AS student_email
        FROM applications
        INNER JOIN projects
            ON applications.project_id = projects.id
        INNER JOIN users
            ON applications.student_id = users.id
        WHERE projects.user_id = ?
        ORDER BY applications.applied_at DESC
    `;

    db.query(sql, [companyId], (err, results) => {
        if (err) {
            console.error("Error fetching company applications:", err);

            return res.status(500).json({
                success: false,
                message: "Failed to fetch applications."
            });
        }

        res.json({
            success: true,
            applications: results
        });
    });
});
// Update application status
app.put("/api/applications/:id/status", (req, res) => {
    const applicationId = req.params.id;
    const { status } = req.body;

    if (!status || !["accepted", "rejected"].includes(status)) {
        return res.status(400).json({
            success: false,
            message: "Status must be accepted or rejected."
        });
    }

    const sql = `
        UPDATE applications
        SET status = ?
        WHERE id = ?
    `;

    db.query(sql, [status, applicationId], (err, result) => {
        if (err) {
            console.error("Error updating application:", err);

            return res.status(500).json({
                success: false,
                message: "Failed to update application status."
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Application not found."
            });
        }

        res.json({
            success: true,
            message: `Application ${status} successfully.`
        });
    });
});
// Get applications for a student
app.get("/api/student/applications/:studentId", (req, res) => {
    const studentId = req.params.studentId;

    const sql = `
        SELECT
            applications.id AS application_id,
            applications.status,
            applications.applied_at,
            projects.id AS project_id,
            projects.title AS project_title,
            projects.company_name,
            projects.category
        FROM applications
        INNER JOIN projects
            ON applications.project_id = projects.id
        WHERE applications.student_id = ?
        ORDER BY applications.applied_at DESC
    `;

    db.query(sql, [studentId], (err, results) => {
        if (err) {
            console.error("Error fetching student applications:", err);

            return res.status(500).json({
                success: false,
                message: "Failed to fetch applications."
            });
        }

        res.json({
            success: true,
            applications: results
        });
    });
});
// Start server
const PORT = 5001;

app.listen(PORT, () => {
    console.log(`SkillBridge backend running on http://localhost:${PORT}`);
});
