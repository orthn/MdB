const Challenge = require("../models/challenge");
const Level = require("../models/level");

const programming = async (req, res) => {
    try {
        await Challenge.deleteMany({});
        await Level.deleteMany({});

        /* Variables */
        const variables = await Challenge.create({
            title: 'Grundlagen Variablen',
            principle: 'Variablen',
            description: 'Lerne Variablen zu erstellen, zu verwenden und auszugeben',
            order: 1,
            isActive: true,
        });
        await Level.insertMany([{
            challengeId: variables._id,
            title: 'Meine erste Variable',
            description: 'Speichere die Ziffer 3 in Variable x',
            mode: 'blocks',
            starterBlocks: ['int ', 'x ', '= ', '3', ';'],
            hints: [{text: 'Vergiss nicht, am Ende `;` einzufügen', order: 1}],
            solutions: [{mode: 'blocks', code: 'int x = 3;', isCorrect: true, feedback: 'Das hast du super gelöst!'}],
            order: 1,
            isActive: true,
            xpReward: 10,
            difficulty: 'easy',
        }, {
            challengeId: variables._id,
            title: 'Meine erste Variable',
            description: 'Speichere die Ziffer 3 in Variable x',
            mode: 'code',
            starterCode: 'int x = ',
            hints: [{text: 'Vergiss nicht, am Ende `;` einzufügen', order: 1}],
            solutions: [
                {mode: 'code', code: 'int x =', isCorrect: false, explanation: 'Speichere die Ziffer 3'},
                {mode: 'code', code: 'int x = 3', isCorrect: false, explanation: 'Vergiss das `;` nicht'},
                {mode: 'code', code: 'int x = 3;', isCorrect: true},
            ],
            order: 1,
            difficulty: 'easy',
            xpReward: 10,
            isActive: true,
        }, {
            challengeId: variables._id,
            title: 'Variable ausgeben',
            description: 'Gib den Wert von x aus',
            mode: 'code',
            starterCode: 'console.log(',
            expectedOutput: '3',
            hints: [{text: 'Nutze console.log(x);', order: 1}],
            solutions: [{mode: 'code', code: 'console.log(x);', isCorrect: true}],
            order: 2,
            isActive: true,
            xpReward: 10,
            difficulty: 'easy',
        }, {
            challengeId: variables._id,
            title: 'Mehrere Variablen',
            description: 'Erstelle y = 5 und gib x + y aus',
            mode: 'code',
            starterCode: 'int x = 3;\nint y = ',
            expectedOutput: '8',
            hints: [{text: 'Vergiss nicht, beide Variablen zu deklarieren', order: 1}],
            solutions: [{mode: 'code', code: 'int x = 3;\nint y = 5;\nconsole.log(x + y);', isCorrect: true}],
            order: 3,
            isActive: false,
            difficulty: 'medium',
            xpReward: 20,
        }]);

        /* Loops */
        const loops = await Challenge.create({
            title: 'Schleifen',
            principle: 'Schleifen',
            description: 'Lerne for- und while-Schleifen zu verwenden',
            order: 2,
            isActive: true,
        });
        await Level.insertMany([{
            challengeId: loops._id,
            title: 'Einfache for-Schleife',
            description: 'Gib Zahlen von 1 bis 5 aus',
            mode: 'code',
            starterCode: 'for (let i = 1; i <= 5; i++) {\n  \n}',
            expectedOutput: '1\n2\n3\n4\n5',
            hints: [{text: 'Denke an console.log()', order: 1}, {text: 'Die Schleife muss bei 5 enden', order: 2}],
            solutions: [{mode: 'code', code: 'for (let i = 1; i <= 5; i++) { console.log(i); }', isCorrect: true}],
            order: 1,
            isActive: true,
            difficulty: 'easy',
            xpReward: 10,
        }, {
            challengeId: loops._id,
            title: 'Schleifen mit Bedingung',
            description: 'Gib nur gerade Zahlen von 1 bis 10 aus',
            mode: 'code',
            starterCode: 'for (let i = 1; i <= 10; i++) {\n  \n}',
            expectedOutput: '2\n4\n6\n8\n10',
            hints: [{text: 'Nutze i % 2 === 0', order: 1}],
            solutions: [{mode: 'code', code: 'for (let i = 1; i <= 10; i++) { if(i%2===0) console.log(i); }', isCorrect: true}],
            order: 2,
            isActive: false,
            xpReward: 20,
            difficulty: 'medium',
        }]);

        /* Conditionals */
        const conditionals = await Challenge.create({
            title: 'Bedingungen',
            principle: 'if/else',
            description: 'Lerne if-else und Vergleichsoperatoren',
            order: 3,
            isActive: true,
        });
        await Level.insertMany([{
            challengeId: conditionals._id,
            title: 'Einfache Bedingung',
            description: 'Wenn x > 5, gib "groß" aus, sonst "klein"',
            mode: 'code',
            starterCode: 'let x = 7;\nif (',
            expectedOutput: 'groß',
            hints: [{text: 'Überprüfe if(x > 5)', order: 1}],
            solutions: [{mode: 'code', code: 'let x = 7;\nif(x > 5){console.log("groß");} else {console.log("klein");}', isCorrect: true}],
            order: 1,
            difficulty: 'easy',
            xpReward: 10,
            isActive: true
        }, {
            challengeId: conditionals._id,
            title: 'Mehrere Bedingungen',
            description: 'Wenn x>5 gib "groß", x===5 "mittel", sonst "klein"',
            mode: 'code',
            starterCode: 'let x = 5;\n',
            expectedOutput: 'mittel',
            hints: [{text: 'Nutze if/else if/else', order: 1}],
            solutions: [{mode: 'code', code: 'let x=5;\nif(x>5){console.log("groß");} else if(x===5){console.log("mittel");} else {console.log("klein");}', isCorrect: true}],
            order: 2,
            difficulty: 'medium',
            xpReward: 20,
            isActive: false
        }]);

        /* Functions */
        const functionsChallenge = await Challenge.create({
            title: 'Funktionen',
            principle: 'Funktionen',
            description: 'Lerne Funktionen zu erstellen und aufzurufen',
            order: 4,
            isActive: true,
        });
        await Level.insertMany([{
            challengeId: functionsChallenge._id,
            title: 'Einfache Funktion',
            description: 'Erstelle eine Funktion add(a,b), die a+b zurückgibt',
            mode: 'code',
            starterCode: 'function add(a, b) {\n  ',
            hints: [{text: 'return nicht vergessen', order: 1}],
            solutions: [{mode: 'code', code: 'function add(a,b){return a+b;}', isCorrect: true}],
            order: 1,
            difficulty: 'easy',
            xpReward: 10,
            isActive: true
        }, {
            challengeId: functionsChallenge._id,
            title: 'Funktion aufrufen',
            description: 'Rufe add(2,3) auf und gib das Ergebnis aus',
            mode: 'code',
            starterCode: 'console.log(',
            expectedOutput: '5',
            hints: [{text: 'Nutze console.log(add(2,3));', order: 1}],
            solutions: [{mode: 'code', code: 'console.log(add(2,3));', isCorrect: true}],
            order: 2,
            difficulty: 'medium',
            xpReward: 20,
            isActive: false
        }]);

        /* Arrays */
        const arrays = await Challenge.create({
            title: 'Arrays',
            principle: 'Arrays',
            description: 'Lerne Arrays zu erstellen, zu durchlaufen und Werte auszulesen',
            order: 5,
            isActive: true,
        });
        await Level.insertMany([{
            challengeId: arrays._id,
            title: 'Ein Array erstellen',
            description: 'Erstelle ein Array mit Zahlen 1 bis 5',
            mode: 'code',
            starterCode: 'let arr = [',
            expectedOutput: '[1,2,3,4,5]',
            hints: [{text: 'Nutze eckige Klammern', order: 1}],
            solutions: [{mode: 'code', code: 'let arr=[1,2,3,4,5];', isCorrect: true}],
            order: 1,
            difficulty: 'easy',
            xpReward: 10,
            isActive: true
        }, {
            challengeId: arrays._id,
            title: 'Array durchlaufen',
            description: 'Gib alle Elemente des Arrays aus',
            mode: 'code',
            starterCode: 'for(let i=0;i<arr.length;i++){',
            expectedOutput: '1\n2\n3\n4\n5',
            hints: [{text: 'Nutze console.log(arr[i])', order: 1}],
            solutions: [{mode: 'code', code: 'for(let i=0;i<arr.length;i++){console.log(arr[i]);}', isCorrect: true}],
            order: 2,
            difficulty: 'medium',
            xpReward: 20,
            isActive: false
        }, {
            challengeId: arrays._id,
            title: 'Array mit forEach',
            description: 'Gib alle Elemente mit forEach aus',
            mode: 'code',
            starterCode: 'arr.forEach((x) => {',
            expectedOutput: '1\n2\n3\n4\n5',
            hints: [{text: 'Nutze console.log(x) innerhalb der Funktion', order: 1}],
            solutions: [{mode: 'code', code: 'arr.forEach((x)=>{console.log(x);});', isCorrect: true}],
            order: 3,
            difficulty: 'hard',
            xpReward: 50,
            isActive: false
        }]);

        console.log("DONE SEEDING")
        return res.status(200).json({message: 'Seeding successfully'});
    } catch (err) {
        console.log("ERROR SEEDING")
        return res.status(500).json({message: 'Seeding failed'})
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// MATHEMATICS  (Klasse 5–6 / Alter 10–12)
// ─────────────────────────────────────────────────────────────────────────────
const mathematics = async (req, res) => {
    try {
        await Challenge.deleteMany({});
        await Level.deleteMany({});

        // ══════════════════════════════════════════════════════════════════════
        // 1. GRUNDRECHENARTEN
        // ══════════════════════════════════════════════════════════════════════
        const basics = await Challenge.create({
            title: 'Grundrechenarten',
            principle: 'Addition & Subtraktion',
            description: 'Lerne Plus und Minus mit größeren Zahlen',
            order: 1,
            isActive: true,
        });

        await Level.insertMany([
            {
                challengeId: basics._id,
                title: 'Addition',
                description: 'Rechne: 347 + 256 = ?',
                mode: 'mathematics',
                expectedAnswer: '603',
                hints: [{text: 'Addiere zuerst die Einer: 7 + 6 = 13, schreibe 3, merke dir 1', order: 1}],
                order: 1,
                difficulty: 'easy',
                xpReward: 5,
                isActive: true,
            },
            {
                challengeId: basics._id,
                title: 'Subtraktion',
                description: 'Rechne: 500 - 183 = ?',
                mode: 'mathematics',
                expectedAnswer: '317',
                hints: [{text: 'Nutze den Ergänzungsweg: 183 + ? = 500', order: 1}],
                order: 2,
                difficulty: 'easy',
                xpReward: 5,
                isActive: true,
            },
            {
                challengeId: basics._id,
                title: 'Rechenzeichen bestimmen',
                description: 'Welches Zeichen macht die Rechnung richtig? 15 __ 8 = 7',
                mode: 'mathematics',
                expectedAnswer: '-',
                choices: ['+', '-', '×', '÷'],
                hints: [{text: 'Du musst von 15 auf 7 kommen', order: 1}],
                order: 3,
                difficulty: 'easy',
                xpReward: 5,
                isActive: true,
            },
            {
                challengeId: basics._id,
                title: 'Textaufgabe',
                description: 'In der Schule sind 348 Schüler. 127 sind krank. Wie viele sind anwesend?',
                mode: 'mathematics',
                expectedAnswer: '221',
                hints: [{text: 'Anwesend = Gesamt − Krank', order: 1}],
                order: 4,
                difficulty: 'medium',
                xpReward: 15,
                isActive: true,
            },
            {
                challengeId: basics._id,
                title: 'Ergebnis schätzen',
                description: 'Welches Ergebnis ist ungefähr richtig für 198 + 203?',
                mode: 'mathematics',
                expectedAnswer: '400',
                choices: ['200', '300', '400', '500'],
                hints: [{text: 'Runde beide Zahlen auf Hundert', order: 1}],
                order: 5,
                difficulty: 'easy',
                xpReward: 5,
                isActive: true,
            },
        ]);

        // ══════════════════════════════════════════════════════════════════════
        // 2. MULTIPLIKATION & DIVISION
        // ══════════════════════════════════════════════════════════════════════
        const mulDiv = await Challenge.create({
            title: 'Multiplikation & Division',
            principle: 'Mal- und Geteiltrechnen',
            description: 'Übe das Einmaleins und einfache Division',
            order: 2,
            isActive: true,
        });

        await Level.insertMany([
            {
                challengeId: mulDiv._id,
                title: 'Einmaleins',
                description: 'Rechne: 7 × 8 = ?',
                mode: 'mathematics',
                expectedAnswer: '56',
                hints: [{text: '7 × 8 = 7 × 4 × 2 = 28 × 2', order: 1}],
                order: 1,
                difficulty: 'easy',
                xpReward: 5,
                isActive: true,
            },
            {
                challengeId: mulDiv._id,
                title: 'Welches Ergebnis ist richtig?',
                description: '9 × 6 = ?',
                mode: 'mathematics',
                expectedAnswer: '54',
                choices: ['45', '54', '63', '48'],
                hints: [{text: '9 × 6 = 10 × 6 − 6 = 60 − 6', order: 1}],
                order: 2,
                difficulty: 'easy',
                xpReward: 5,
                isActive: true,
            },
            {
                challengeId: mulDiv._id,
                title: 'Division mit Rest',
                description: 'Rechne: 29 ÷ 4 = ? Rest ?  (Schreibe z.B. 7 R 1)',
                mode: 'mathematics',
                expectedAnswer: '7 R 1',
                hints: [{text: '4 × 7 = 28, also bleibt 1 übrig', order: 1}],
                order: 3,
                difficulty: 'medium',
                xpReward: 10,
                isActive: true,
            },
            {
                challengeId: mulDiv._id,
                title: 'Multiplikation mit Zehnern',
                description: 'Rechne: 24 × 30 = ?',
                mode: 'mathematics',
                expectedAnswer: '720',
                hints: [{text: '24 × 3 = 72, dann mit 10 multiplizieren', order: 1}],
                order: 4,
                difficulty: 'medium',
                xpReward: 10,
                isActive: true,
            },
            {
                challengeId: mulDiv._id,
                title: 'Welche Rechnung stimmt?',
                description: 'Was ist 72 ÷ 8?',
                mode: 'mathematics',
                expectedAnswer: '9',
                choices: ['7', '8', '9', '10'],
                hints: [{text: '8 × 9 = 72', order: 1}],
                order: 5,
                difficulty: 'easy',
                xpReward: 5,
                isActive: true,
            },
            {
                challengeId: mulDiv._id,
                title: 'Textaufgabe',
                description: 'Ein Karton fasst 12 Flaschen. Wie viele Kartons braucht man für 84 Flaschen?',
                mode: 'mathematics',
                expectedAnswer: '7',
                hints: [{text: '84 ÷ 12 = ?', order: 1}],
                order: 6,
                difficulty: 'medium',
                xpReward: 15,
                isActive: true,
            },
        ]);

        // ══════════════════════════════════════════════════════════════════════
        // 3. BRUCHRECHNUNG
        // ══════════════════════════════════════════════════════════════════════
        const fractions = await Challenge.create({
            title: 'Bruchrechnung',
            principle: 'Brüche',
            description: 'Lerne Brüche zu verstehen, vergleichen und addieren',
            order: 3,
            isActive: true,
        });

        await Level.insertMany([
            {
                challengeId: fractions._id,
                title: 'Bruch erkennen',
                description: 'Welcher Bruch beschreibt "drei von vier gleichen Teilen"?',
                mode: 'mathematics',
                expectedAnswer: '3/4',
                choices: ['1/4', '3/4', '4/3', '3/3'],
                hints: [{text: 'Zähler = genommene Teile, Nenner = Gesamtteile', order: 1}],
                order: 1,
                difficulty: 'easy',
                xpReward: 5,
                isActive: true,
            },
            {
                challengeId: fractions._id,
                title: 'Größer oder kleiner?',
                description: 'Was ist größer: 1/2 oder 1/3?',
                mode: 'mathematics',
                expectedAnswer: '1/2',
                choices: ['1/2', '1/3'],
                hints: [{text: 'Je kleiner der Nenner, desto größer der Anteil', order: 1}],
                order: 2,
                difficulty: 'easy',
                xpReward: 5,
                isActive: true,
            },
            {
                challengeId: fractions._id,
                title: 'Brüche addieren – gleicher Nenner',
                description: 'Rechne: 2/7 + 3/7 = ?',
                mode: 'mathematics',
                expectedAnswer: '5/7',
                hints: [{text: 'Gleicher Nenner → Zähler addieren, Nenner bleibt', order: 1}],
                order: 3,
                difficulty: 'easy',
                xpReward: 10,
                isActive: true,
            },
            {
                challengeId: fractions._id,
                title: 'Brüche addieren – verschiedener Nenner',
                description: 'Rechne: 1/2 + 1/4 = ?',
                mode: 'mathematics',
                expectedAnswer: '3/4',
                choices: ['2/6', '3/4', '2/4', '1/2'],
                hints: [
                    {text: 'Bringe beide auf den gleichen Nenner (4)', order: 1},
                    {text: '1/2 = 2/4, also 2/4 + 1/4 = ?', order: 2},
                ],
                order: 4,
                difficulty: 'medium',
                xpReward: 15,
                isActive: true,
            },
            {
                challengeId: fractions._id,
                title: 'Kürzen',
                description: 'Kürze den Bruch: 6/8 = ?',
                mode: 'mathematics',
                expectedAnswer: '3/4',
                choices: ['3/4', '2/4', '6/8', '1/2'],
                hints: [{text: 'Teile Zähler und Nenner durch 2', order: 1}],
                order: 5,
                difficulty: 'medium',
                xpReward: 15,
                isActive: true,
            },
            {
                challengeId: fractions._id,
                title: 'Bruch von einer Menge',
                description: '3/4 von 20 Äpfeln – wie viele Äpfel sind das?',
                mode: 'mathematics',
                expectedAnswer: '15',
                hints: [
                    {text: '1/4 von 20 = 20 ÷ 4 = 5', order: 1},
                    {text: '3/4 = 3 × (1/4 von 20)', order: 2},
                ],
                order: 6,
                difficulty: 'medium',
                xpReward: 20,
                isActive: true,
            },
            {
                challengeId: fractions._id,
                title: 'Gemischte Zahl',
                description: 'Schreibe als gemischte Zahl: 9/4 = ?',
                mode: 'mathematics',
                expectedAnswer: '2 1/4',
                hints: [{text: '9 ÷ 4 = 2 Rest 1, also 2 ganze und 1/4', order: 1}],
                order: 7,
                difficulty: 'hard',
                xpReward: 25,
                isActive: true,
            },
        ]);

        // ══════════════════════════════════════════════════════════════════════
        // 4. DEZIMALZAHLEN
        // ══════════════════════════════════════════════════════════════════════
        const decimals = await Challenge.create({
            title: 'Dezimalzahlen',
            principle: 'Kommazahlen',
            description: 'Rechne mit Dezimalzahlen und verstehe Zehntel & Hundertstel',
            order: 4,
            isActive: true,
        });

        await Level.insertMany([
            {
                challengeId: decimals._id,
                title: 'Dezimalzahl lesen',
                description: 'Welche Zahl zeigt "drei Zehntel"?',
                mode: 'mathematics',
                expectedAnswer: '0,3',
                choices: ['3,0', '0,3', '0,03', '30'],
                hints: [{text: 'Ein Zehntel = 0,1', order: 1}],
                order: 1,
                difficulty: 'easy',
                xpReward: 5,
                isActive: true,
            },
            {
                challengeId: decimals._id,
                title: 'Dezimalzahlen addieren',
                description: 'Rechne: 3,4 + 1,8 = ?',
                mode: 'mathematics',
                expectedAnswer: '5,2',
                hints: [{text: '4 + 8 = 12, also eine Stelle übertragen', order: 1}],
                order: 2,
                difficulty: 'easy',
                xpReward: 5,
                isActive: true,
            },
            {
                challengeId: decimals._id,
                title: 'Dezimalzahlen subtrahieren',
                description: 'Rechne: 7,5 − 2,8 = ?',
                mode: 'mathematics',
                expectedAnswer: '4,7',
                hints: [{text: 'Schreibe die Zahlen untereinander und richte das Komma aus', order: 1}],
                order: 3,
                difficulty: 'medium',
                xpReward: 10,
                isActive: true,
            },
            {
                challengeId: decimals._id,
                title: 'Größer oder kleiner?',
                description: 'Welche Zahl ist größer?',
                mode: 'mathematics',
                expectedAnswer: '0,9',
                choices: ['0,09', '0,9'],
                hints: [{text: '0,9 = 9 Zehntel, 0,09 = 9 Hundertstel', order: 1}],
                order: 4,
                difficulty: 'easy',
                xpReward: 5,
                isActive: true,
            },
            {
                challengeId: decimals._id,
                title: 'Dezimalzahl multiplizieren',
                description: 'Rechne: 2,5 × 4 = ?',
                mode: 'mathematics',
                expectedAnswer: '10',
                choices: ['8', '9', '10', '10,5'],
                hints: [{text: '2,5 × 4 = 2 × 4 + 0,5 × 4', order: 1}],
                order: 5,
                difficulty: 'medium',
                xpReward: 10,
                isActive: true,
            },
            {
                challengeId: decimals._id,
                title: 'Einkauf an der Kasse',
                description: 'Du kaufst etwas für 3,70 € und gibst 5,00 € – wie viel Wechselgeld bekommst du?',
                mode: 'mathematics',
                expectedAnswer: '1,30',
                hints: [{text: '5,00 − 3,70 = ?', order: 1}],
                order: 6,
                difficulty: 'medium',
                xpReward: 15,
                isActive: true,
            },
        ]);

        // ══════════════════════════════════════════════════════════════════════
        // 5. PROZENTRECHNUNG
        // ══════════════════════════════════════════════════════════════════════
        const percent = await Challenge.create({
            title: 'Prozentrechnung',
            principle: 'Prozent',
            description: 'Verstehe Prozent und berechne Rabatte und Anteile',
            order: 5,
            isActive: true,
        });

        await Level.insertMany([
            {
                challengeId: percent._id,
                title: 'Was bedeutet Prozent?',
                description: 'Wie viel ist 1 %?',
                mode: 'mathematics',
                expectedAnswer: '1/100',
                choices: ['1/10', '1/100', '1/1000', '10/100'],
                hints: [{text: 'Pro Cent = pro Hundert', order: 1}],
                order: 1,
                difficulty: 'easy',
                xpReward: 5,
                isActive: true,
            },
            {
                challengeId: percent._id,
                title: 'Einfache Prozentrechnung',
                description: 'Wie viel sind 50 % von 80?',
                mode: 'mathematics',
                expectedAnswer: '40',
                choices: ['20', '40', '60', '80'],
                hints: [{text: '50 % = die Hälfte', order: 1}],
                order: 2,
                difficulty: 'easy',
                xpReward: 5,
                isActive: true,
            },
            {
                challengeId: percent._id,
                title: '10 % berechnen',
                description: 'Wie viel sind 10 % von 350?',
                mode: 'mathematics',
                expectedAnswer: '35',
                hints: [{text: '10 % = Zahl durch 10 teilen', order: 1}],
                order: 3,
                difficulty: 'easy',
                xpReward: 5,
                isActive: true,
            },
            {
                challengeId: percent._id,
                title: '25 % berechnen',
                description: 'Wie viel sind 25 % von 60?',
                mode: 'mathematics',
                expectedAnswer: '15',
                hints: [{text: '25 % = ein Viertel = ÷ 4', order: 1}],
                order: 4,
                difficulty: 'medium',
                xpReward: 10,
                isActive: true,
            },
            {
                challengeId: percent._id,
                title: 'Rabatt berechnen',
                description: 'Ein Fahrrad kostet 120 €. Es gibt 20 % Rabatt. Wie viel kostet es jetzt?',
                mode: 'mathematics',
                expectedAnswer: '96',
                hints: [
                    {text: '10 % von 120 = 12, also 20 % = 24', order: 1},
                    {text: '120 − 24 = ?', order: 2},
                ],
                order: 5,
                difficulty: 'medium',
                xpReward: 15,
                isActive: true,
            },
            {
                challengeId: percent._id,
                title: 'Prozentwert bestimmen',
                description: '15 von 60 Schülern fahren mit dem Rad. Wie viel Prozent ist das?',
                mode: 'mathematics',
                expectedAnswer: '25',
                choices: ['15 %', '20 %', '25 %', '30 %'],
                hints: [{text: '15 ÷ 60 × 100 = ?', order: 1}],
                order: 6,
                difficulty: 'hard',
                xpReward: 25,
                isActive: true,
            },
        ]);

        // ══════════════════════════════════════════════════════════════════════
        // 6. GEOMETRIE – FLÄCHEN
        // ══════════════════════════════════════════════════════════════════════
        const geometry = await Challenge.create({
            title: 'Geometrie – Flächen',
            principle: 'Flächenberechnung',
            description: 'Berechne Umfang und Fläche einfacher Figuren',
            order: 6,
            isActive: true,
        });

        await Level.insertMany([
            {
                challengeId: geometry._id,
                title: 'Rechteck – Umfang',
                description: 'Ein Rechteck ist 6 cm lang und 4 cm breit. Wie groß ist der Umfang?',
                mode: 'mathematics',
                expectedAnswer: '20',
                choices: ['10 cm', '20 cm', '24 cm', '48 cm'],
                hints: [{text: 'Umfang = 2 × (Länge + Breite)', order: 1}],
                order: 1,
                difficulty: 'easy',
                xpReward: 5,
                isActive: true,
            },
            {
                challengeId: geometry._id,
                title: 'Rechteck – Fläche',
                description: 'Ein Rechteck ist 8 cm lang und 5 cm breit. Wie groß ist die Fläche in cm²?',
                mode: 'mathematics',
                expectedAnswer: '40',
                hints: [{text: 'Fläche = Länge × Breite', order: 1}],
                order: 2,
                difficulty: 'easy',
                xpReward: 5,
                isActive: true,
            },
            {
                challengeId: geometry._id,
                title: 'Quadrat – Fläche',
                description: 'Ein Quadrat hat eine Seite von 7 cm. Wie groß ist die Fläche in cm²?',
                mode: 'mathematics',
                expectedAnswer: '49',
                choices: ['14 cm²', '28 cm²', '49 cm²', '56 cm²'],
                hints: [{text: 'Fläche Quadrat = Seite × Seite', order: 1}],
                order: 3,
                difficulty: 'easy',
                xpReward: 5,
                isActive: true,
            },
            {
                challengeId: geometry._id,
                title: 'Dreieck – Fläche',
                description: 'Ein Dreieck hat Grundlinie 10 cm und Höhe 6 cm. Wie groß ist die Fläche in cm²?',
                mode: 'mathematics',
                expectedAnswer: '30',
                hints: [{text: 'Fläche Dreieck = (Grundlinie × Höhe) ÷ 2', order: 1}],
                order: 4,
                difficulty: 'medium',
                xpReward: 10,
                isActive: true,
            },
            {
                challengeId: geometry._id,
                title: 'Welche Figur hat die größte Fläche?',
                description: 'Quadrat 5×5 cm, Rechteck 4×7 cm oder Rechteck 3×9 cm – welches ist am größten?',
                mode: 'mathematics',
                expectedAnswer: 'Rechteck 4×7',
                choices: ['Quadrat 5×5', 'Rechteck 4×7', 'Rechteck 3×9'],
                hints: [{text: 'Berechne alle drei Flächen und vergleiche', order: 1}],
                order: 5,
                difficulty: 'medium',
                xpReward: 15,
                isActive: true,
            },
            {
                challengeId: geometry._id,
                title: 'Rasen säen',
                description: 'Ein rechteckiger Garten ist 12 m lang und 8 m breit. Wie viele m² Rasen werden benötigt?',
                mode: 'mathematics',
                expectedAnswer: '96',
                hints: [{text: 'Fläche = Länge × Breite', order: 1}],
                order: 6,
                difficulty: 'medium',
                xpReward: 15,
                isActive: true,
            },
        ]);

        // ══════════════════════════════════════════════════════════════════════
        // 7. GEOMETRIE – KÖRPER
        // ══════════════════════════════════════════════════════════════════════
        const bodies = await Challenge.create({
            title: 'Geometrie – Körper',
            principle: 'Würfel & Quader',
            description: 'Lerne Würfel und Quader kennen und berechne ihr Volumen',
            order: 7,
            isActive: true,
        });

        await Level.insertMany([
            {
                challengeId: bodies._id,
                title: 'Körper erkennen',
                description: 'Welcher Körper hat sechs gleich große quadratische Flächen?',
                mode: 'mathematics',
                expectedAnswer: 'Würfel',
                choices: ['Quader', 'Würfel', 'Zylinder', 'Kugel'],
                hints: [{text: 'Alle Seiten sind gleich lang', order: 1}],
                order: 1,
                difficulty: 'easy',
                xpReward: 5,
                isActive: true,
            },
            {
                challengeId: bodies._id,
                title: 'Würfel – Volumen',
                description: 'Ein Würfel hat eine Kantenlänge von 3 cm. Wie groß ist sein Volumen in cm³?',
                mode: 'mathematics',
                expectedAnswer: '27',
                choices: ['9 cm³', '18 cm³', '27 cm³', '36 cm³'],
                hints: [{text: 'Volumen Würfel = Kante³ = Kante × Kante × Kante', order: 1}],
                order: 2,
                difficulty: 'easy',
                xpReward: 5,
                isActive: true,
            },
            {
                challengeId: bodies._id,
                title: 'Quader – Volumen',
                description: 'Ein Quader ist 5 cm lang, 4 cm breit und 3 cm hoch. Wie groß ist sein Volumen in cm³?',
                mode: 'mathematics',
                expectedAnswer: '60',
                hints: [{text: 'Volumen Quader = Länge × Breite × Höhe', order: 1}],
                order: 3,
                difficulty: 'medium',
                xpReward: 10,
                isActive: true,
            },
            {
                challengeId: bodies._id,
                title: 'Aquarium befüllen',
                description: 'Ein Aquarium ist 60 cm lang, 30 cm breit und 40 cm hoch. Wie viele Liter fasst es? (1 Liter = 1000 cm³)',
                mode: 'mathematics',
                expectedAnswer: '72',
                hints: [
                    {text: 'Berechne erst das Volumen in cm³', order: 1},
                    {text: 'Dann teile durch 1000 um Liter zu erhalten', order: 2},
                ],
                order: 4,
                difficulty: 'hard',
                xpReward: 25,
                isActive: true,
            },
        ]);

        // ══════════════════════════════════════════════════════════════════════
        // 8. VERHÄLTNISSE & PROPORTIONEN
        // ══════════════════════════════════════════════════════════════════════
        const ratios = await Challenge.create({
            title: 'Verhältnisse',
            principle: 'Verhältnisse & Proportionen',
            description: 'Verstehe Verhältnisse und löse proportionale Aufgaben',
            order: 8,
            isActive: true,
        });

        await Level.insertMany([
            {
                challengeId: ratios._id,
                title: 'Verhältnis vereinfachen',
                description: 'Vereinfache das Verhältnis 6:4',
                mode: 'mathematics',
                expectedAnswer: '3:2',
                choices: ['6:4', '3:2', '2:3', '1:2'],
                hints: [{text: 'Teile beide Zahlen durch ihren ggT (= 2)', order: 1}],
                order: 1,
                difficulty: 'easy',
                xpReward: 5,
                isActive: true,
            },
            {
                challengeId: ratios._id,
                title: 'Proportionaler Dreisatz',
                description: '3 Hefte kosten 2,40 €. Was kosten 7 Hefte?',
                mode: 'mathematics',
                expectedAnswer: '5,60',
                hints: [
                    {text: '1 Heft kostet: 2,40 ÷ 3 = ?', order: 1},
                    {text: 'Dann × 7', order: 2},
                ],
                order: 2,
                difficulty: 'medium',
                xpReward: 15,
                isActive: true,
            },
            {
                challengeId: ratios._id,
                title: 'Mischungsverhältnis',
                description: 'Orangensaft und Wasser werden im Verhältnis 1:3 gemischt. Wie viel ml Wasser braucht man für 250 ml Saft?',
                mode: 'mathematics',
                expectedAnswer: '750',
                hints: [{text: '1 Teil Saft → 3 Teile Wasser', order: 1}],
                order: 3,
                difficulty: 'medium',
                xpReward: 20,
                isActive: true,
            },
            {
                challengeId: ratios._id,
                title: 'Karte lesen',
                description: 'Auf einer Karte im Maßstab 1:50 000 misst eine Strecke 4 cm. Wie lang ist sie in der Wirklichkeit (in km)?',
                mode: 'mathematics',
                expectedAnswer: '2',
                hints: [
                    {text: '4 cm × 50 000 = ? cm', order: 1},
                    {text: '200 000 cm = ? km (÷ 100 000)', order: 2},
                ],
                order: 4,
                difficulty: 'hard',
                xpReward: 25,
                isActive: true,
            },
        ]);

        // ══════════════════════════════════════════════════════════════════════
        // 9. NEGATIVE ZAHLEN
        // ══════════════════════════════════════════════════════════════════════
        const negativeNumbers = await Challenge.create({
            title: 'Negative Zahlen',
            principle: 'Ganze Zahlen',
            description: 'Lerne mit negativen Zahlen rechnen – wie bei Temperaturen!',
            order: 9,
            isActive: true,
        });

        await Level.insertMany([
            {
                challengeId: negativeNumbers._id,
                title: 'Zahlenstrahl',
                description: 'Welche Zahl liegt zwischen −3 und −1?',
                mode: 'mathematics',
                expectedAnswer: '-2',
                choices: ['0', '-2', '1', '-4'],
                hints: [{text: 'Stell dir einen Thermometer vor', order: 1}],
                order: 1,
                difficulty: 'easy',
                xpReward: 5,
                isActive: true,
            },
            {
                challengeId: negativeNumbers._id,
                title: 'Temperatur',
                description: 'Morgens sind es −5 °C. Mittags steigt die Temperatur um 9 °C. Wie viel Grad sind es mittags?',
                mode: 'mathematics',
                expectedAnswer: '4',
                choices: ['-4 °C', '4 °C', '14 °C', '-14 °C'],
                hints: [{text: '−5 + 9 = ?', order: 1}],
                order: 2,
                difficulty: 'easy',
                xpReward: 5,
                isActive: true,
            },
            {
                challengeId: negativeNumbers._id,
                title: 'Addition negativer Zahlen',
                description: 'Rechne: (−4) + (−3) = ?',
                mode: 'mathematics',
                expectedAnswer: '-7',
                choices: ['-1', '1', '-7', '7'],
                hints: [{text: 'Beide Zahlen sind negativ, also werden die Beträge addiert', order: 1}],
                order: 3,
                difficulty: 'medium',
                xpReward: 10,
                isActive: true,
            },
            {
                challengeId: negativeNumbers._id,
                title: 'Subtraktion',
                description: 'Rechne: 3 − 8 = ?',
                mode: 'mathematics',
                expectedAnswer: '-5',
                hints: [{text: 'Du gehst auf dem Zahlenstrahl von 3 aus 8 Schritte nach links', order: 1}],
                order: 4,
                difficulty: 'medium',
                xpReward: 10,
                isActive: true,
            },
            {
                challengeId: negativeNumbers._id,
                title: 'Größer oder kleiner?',
                description: 'Welche Zahl ist größer?',
                mode: 'mathematics',
                expectedAnswer: '-1',
                choices: ['-5', '-1'],
                hints: [{text: 'Auf dem Zahlenstrahl liegt die größere Zahl weiter rechts', order: 1}],
                order: 5,
                difficulty: 'easy',
                xpReward: 5,
                isActive: true,
            },
        ]);

        console.log("DONE SEEDING");
        return res.status(200).json({message: 'Seeding successfully'});
    } catch (err) {
        console.log("ERROR SEEDING", err);
        return res.status(500).json({message: 'Seeding failed'});
    }
};

module.exports = {programming, mathematics};
