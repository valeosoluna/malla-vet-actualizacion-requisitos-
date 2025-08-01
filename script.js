document.addEventListener('DOMContentLoaded', () => {
    // Definición de todos los ramos con sus prerrequisitos.
    const courses = {
        '1': { name: 'Introducción a las Ciencias Veterinarias', level: 1, prereqs: [] },
        '2': { name: 'Fundamentos de la Química', level: 1, prereqs: [] },
        '3': { name: 'Biología Celular y Molecular', level: 1, prereqs: [] },
        '4': { name: 'Matemática', level: 1, prereqs: [] },
        '5': { name: 'Zoología', level: 1, prereqs: [] },
        '6': { name: 'Fundamentos de la Física', level: 1, prereqs: [] },
        '7': { name: 'Anatomía Animal I', level: 2, prereqs: ['5'] },
        '8': { name: 'Praderas y Especies Forrajeras', level: 2, prereqs: ['3'] },
        '9': { name: 'Fundamentos de Bioquímica', level: 2, prereqs: ['2'] },
        '10': { name: 'Histoembriología Veterinaria', level: 2, prereqs: ['3'] },
        '11': { name: 'Ecología', level: 2, prereqs: ['4', '5'] },
        '12': { name: 'Electivo 1', level: 2, prereqs: [], elective: true },
        '13': { name: 'Anatomía Animal II', level: 3, prereqs: ['7'] },
        '14': { name: 'Nutrición y Alimentación Animal', level: 3, prereqs: ['8', '9'] },
        '15': { name: 'Fisiología Veterinaria', level: 3, prereqs: ['9', '10'] },
        '16': { name: 'Práctica Inicial', level: 3, prereqs: ['7', '11'] },
        '17': { name: 'Inmunología General', level: 3, prereqs: ['3', '9'] },
        '18': { name: 'Bioestadística', level: 3, prereqs: ['4'] },
        '19': { name: 'Electivo 2', level: 3, prereqs: [], elective: true },
        '20': { name: 'Etología y Bienestar Animal', level: 4, prereqs: ['15'] },
        '21': { name: 'Histopatología', level: 4, prereqs: ['15'] },
        '22': { name: 'Microbiología Veterinaria', level: 4, prereqs: ['17'] },
        '23': { name: 'Conservación de Fauna Silvestre', level: 4, prereqs: ['11'] },
        '24': { name: 'Métodos de Investigación en Salud', level: 4, prereqs: ['18'] },
        '25': { name: 'Electivo 3', level: 4, prereqs: [], elective: true },
        '26': { name: 'Genética en Ciencias Veterinarias', level: 5, prereqs: ['18'] },
        '27': { name: 'Epidemiología Veterinaria', level: 5, prereqs: ['24'] },
        '28': { name: 'Fisiopatología Veterinaria', level: 5, prereqs: ['13', '21'] },
        '29': { name: 'Gestión Ambiental y Desarrollo Sustentable', level: 5, prereqs: ['23'] },
        '30': { name: 'Gestión Contable y Financiera', level: 5, prereqs: ['18'] },
        '31': { name: 'Electivo 4', level: 5, prereqs: [], elective: true },
        '32': { name: 'Semiología veterinaria', level: 6, prereqs: ['20', '28'] },
        '33': { name: 'Reproducción animal', level: 6, prereqs: ['15'] },
        '34': { name: 'Anatomía Patológica', level: 6, prereqs: ['28'] },
        '35': { name: 'Microbiología de los Alimentos', level: 6, prereqs: ['22', '24'] },
        '36': { name: 'Práctica Intermedia', level: 6, prereqs: ['16', '20'] },
        '37': { name: 'Fundamentos del ecosistema de Salud digital (Electivo 5)', level: 6, prereqs: [], elective: true },
        '38': { name: 'Sistemas de Producción Animal', level: 7, prereqs: ['14', '26'] },
        '39': { name: 'Farmacología Veterinaria', level: 7, prereqs: ['28'] },
        '40': { name: 'Enfermedades producidas por agentes biológicos I', level: 7, prereqs: ['27', '35'] },
        '41': { name: 'Procedimientos clínicos', level: 7, prereqs: ['32'] },
        '42': { name: 'Imagenología', level: 7, prereqs: ['34'] },
        '43': { name: 'Inteligencia artificial aplicada a la salud', level: 7, prereqs: ['18'] },
        '44': { name: 'Laboratorio clínico y biotecnología', level: 8, prereqs: ['34', '40'] },
        '45': { name: 'Investigación en Ciencias Veterinarias', level: 8, prereqs: ['24', '39'] },
        '46': { name: 'Enfermedades producidas por agentes biológicos II', level: 8, prereqs: ['40'] },
        '47': { name: 'Principios de cirugía y anestesiología', level: 8, prereqs: ['39', '41'] },
        '48': { name: 'Medicina interna', level: 8, prereqs: ['32', '42'] },
        '49': { name: 'Bioética', level: 8, prereqs: [] },
        '50': { name: 'Salud Pública Veterinaria', level: 9, prereqs: ['46'] },
        '51': { name: 'Unidad de Investigación I', level: 9, prereqs: ['45', '49'] },
        '52': { name: 'Internado de Pequeños Animales I', level: 9, prereqs: ['44', '47', '48'] },
        '53': { name: 'Internado de Animales Mayores I', level: 9, prereqs: ['44', '47', '48'] },
        '54': { name: 'Formulación y Evaluación de Proyectos Veterinarios', level: 9, prereqs: ['30', '38'] },
        '55': { name: 'Gestión Veterinaria', level: 9, prereqs: ['30', '38'] },
        '56': { name: 'Práctica Profesional', level: 9, prereqs: [], specialPrereq: 'licenciatura' },
        '57': { name: 'Una Salud', level: 10, prereqs: ['50', '54'] },
        '58': { name: 'Unidad de Investigación II', level: 10, prereqs: ['51'] },
        '59': { name: 'Internado Electivo: Pequeños Animales II', level: 10, prereqs: [], elective: true },
        '60': { name: 'Internado Electivo: Animales Mayores', level: 10, prereqs: [], elective: true },
        '61': { name: 'Internado Electivo: Conservación, Biodiversidad y Medio Ambiente', level: 10, prereqs: [], elective: true },
        '62': { name: 'Internado Electivo: Producción y Sistemas de Aseguramiento de la Calidad', level: 10, prereqs: [], elective: true },
        '63': { name: 'Orientación Laboral y Responsabilidad Ética en Medicina Veterinaria', level: 10, prereqs: ['36'] },
    };

    const courseGrid = document.getElementById('course-grid');
    const progressEl = document.querySelector('.progress');
    const progressPercentageEl = document.getElementById('progress-percentage');
    const remainingCoursesEl = document.getElementById('remaining-courses');
    const availableCoursesList = document.getElementById('available-courses');
    const clearSelectionBtn = document.getElementById('clear-selection');

    let approvedCourses = JSON.parse(localStorage.getItem('approvedCourses')) || [];
    let selectedCourses = [];

    function renderMalla() {
        courseGrid.innerHTML = '';
        const levels = [...new Set(Object.values(courses).map(c => c.level))];
        const allCourseCodes = Object.keys(courses);
        const nonFinalCourses = allCourseCodes.filter(code => code !== '56');
        const allNonFinalCoursesApproved = nonFinalCourses.every(code => approvedCourses.includes(code));

        levels.forEach(level => {
            const semesterDiv = document.createElement('div');
            semesterDiv.classList.add('semester');
            const semesterTitle = document.createElement('h2');
            semesterTitle.textContent = `Nivel ${level}`;
            semesterDiv.appendChild(semesterTitle);

            const coursesInLevel = Object.entries(courses).filter(([_, course]) => course.level === level);

            coursesInLevel.forEach(([code, course]) => {
                const courseDiv = document.createElement('div');
                courseDiv.classList.add('course');
                courseDiv.dataset.code = code;

                const isApproved = approvedCourses.includes(code);
                const prereqsApproved = course.prereqs.every(prereqCode => approvedCourses.includes(prereqCode));
                
                const isFinalCourse = course.specialPrereq === 'licenciatura';
                const isBlocked = !isApproved && (!prereqsApproved || (isFinalCourse && !allNonFinalCoursesApproved));

                if (isApproved) {
                    courseDiv.classList.add('approved');
                } else if (isBlocked) {
                    courseDiv.classList.add('blocked');
                } else {
                    courseDiv.classList.remove('blocked');
                }

                if (course.elective) {
                    courseDiv.classList.add('elective');
                }

                courseDiv.textContent = `${course.name}`;

                if (!isApproved && !isBlocked) {
                    courseDiv.addEventListener('click', () => {
                        toggleApproval(code);
                    });
                }
                
                semesterDiv.appendChild(courseDiv);
            });
            courseGrid.appendChild(semesterDiv);
        });
        updateProgress();
        updateAvailableCourses();
    }

    function toggleApproval(code) {
        if (!approvedCourses.includes(code)) {
            approvedCourses.push(code);
        }
        localStorage.setItem('approvedCourses', JSON.stringify(approvedCourses));
        renderMalla();
    }

    function updateProgress() {
        const totalCourses = Object.keys(courses).length;
        const approvedCount = approvedCourses.length;
        const percentage = (approvedCount / totalCourses) * 100;
        
        progressEl.style.width = `${percentage}%`;
        progressPercentageEl.textContent = `${percentage.toFixed(0)}%`;
        remainingCoursesEl.textContent = totalCourses - approvedCount;
    }

    function updateAvailableCourses() {
        availableCoursesList.innerHTML = '';
        const unapprovedCourses = Object.entries(courses).filter(([code, course]) => !approvedCourses.includes(code));
        
        const nextSemesterCourses = unapprovedCourses.filter(([code, course]) => {
            const prereqsApproved = course.prereqs.every(prereqCode => approvedCourses.includes(prereqCode));
            const isFinalCourse = course.specialPrereq === 'licenciatura';
            const allOtherCoursesApproved = Object.keys(courses).filter(c => c !== '56').every(c => approvedCourses.includes(c));
            
            return prereqsApproved && (!isFinalCourse || allOtherCoursesApproved);
        });

        nextSemesterCourses.forEach(([code, course]) => {
            const courseItem = document.createElement('li');
            courseItem.textContent = `${course.name}`;
            courseItem.classList.add('available-course-item');
            if (selectedCourses.includes(code)) {
                courseItem.classList.add('selected');
            }
            courseItem.addEventListener('click', () => {
                toggleCourseSelection(code, courseItem);
            });
            availableCoursesList.appendChild(courseItem);
        });
    }

    function toggleCourseSelection(code, element) {
        const courseData = courses[code];
        const isElective = courseData.elective;
        const selectedElectives = selectedCourses.filter(c => courses[c].elective);

        if (selectedCourses.includes(code)) {
            selectedCourses = selectedCourses.filter(c => c !== code);
            element.classList.remove('selected');
        } else {
            if (selectedCourses.length >= 6) {
                alert('No puedes tomar más de 6 ramos por semestre.');
                return;
            }
            if (isElective && selectedElectives.length >= 1) {
                alert('No puedes tomar más de 1 electivo por semestre.');
                return;
            }
            selectedCourses.push(code);
            element.classList.add('selected');
        }
    }

    clearSelectionBtn.addEventListener('click', () => {
        selectedCourses = [];
        document.querySelectorAll('.available-course-item').forEach(el => {
            el.classList.remove('selected');
        });
    });

    renderMalla();
});
