//
//  UniversityCredsAPI.js
//  LopesEat
//  Back End
//  Created by Joshua Kirabo on 01/20/24
//

const fs = require('fs');
const path = require('path');

// University Student
class UniversityStudent 
    {
        constructor(firstName, lastName, email, password, gender, diningDollars, dateOfBirth) 
            {
                this.firstName = firstName;
                this.lastName = lastName;
                this.email = email;
                this.password = password; // Not hashing for now to reduce complexity
                this.gender = gender;
                this.diningDollars = diningDollars;
                this.dateOfBirth = dateOfBirth;
            }
    }

class UniversityCredsAPI 
    {
        constructor(dbFilename) 
            {
                this.dbFilename = dbFilename;
                this.students = [];
                this.loadDatabase();
            }

    loadDatabase() 
        {
            try {
                const filePath = path.join(__dirname, this.dbFilename);
                const fileContent = fs.readFileSync(filePath, 'utf-8');
                const lines = fileContent.split('\n');
    
                lines.forEach(line => {
                    if (line.trim().length > 0) {
                        const [firstName, lastName, email, password, gender, dateString, diningDollars] = line.split(',');
                        // Assuming dateString is in the format 'YYYY-MM-DD'
                        const dateOfBirth = new Date(dateString);
                        const student = new UniversityStudent(firstName, lastName, email, password, gender, parseInt(diningDollars, 10), dateOfBirth);
                        this.students.push(student);
                    }
                });
            } catch (err) {
                console.error("Error reading university database file:", err);
            }
        }

    isStudentRegistered(email) 
        {
            return this.students.some(student => student.email === email);
        }
    
        getStudentByEmailAndPassword(email, password) 
            {
                return this.students.find(student => student.email === email && student.password === password);
            }
}

module.exports = UniversityCredsAPI;
