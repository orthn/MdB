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
// MATHEMATICS  –  4. Klasse Volksschule Österreich
// Lehrplan: Zahlenraum bis 1.000.000, Grundrechenarten (schriftlich),
//           Maße & Einheiten, Geometrie (Umfang/Fläche), Brüche, Sachaufgaben
// ─────────────────────────────────────────────────────────────────────────────
const mathematics = async (req, res) => {
    try {
        await Challenge.deleteMany({});
        await Level.deleteMany({});

        // ══════════════════════════════════════════════════════════════════════
        // 1. ZAHLENRAUM BIS 1.000.000
        // ══════════════════════════════════════════════════════════════════════
        const zahlenraum = await Challenge.create({
            title: 'Zahlen bis 1 000 000',
            principle: 'Zahlenraum & Stellenwerte',
            description: 'Lerne große Zahlen lesen, schreiben und verstehen',
            order: 1,
            isActive: true,
        });

        await Level.insertMany([
            {
                // Rechenaufgabe – Freitext
                challengeId: zahlenraum._id,
                title: 'Stellenwerte kennen',
                description: 'Welchen Wert hat die Ziffer 7 in der Zahl 374.816?',
                mode: 'mathematics',
                expectedAnswer: '70000',
                hints: [
                    { text: 'Zähle die Stellen von rechts: Einer, Zehner, Hunderter, Tausender, Zehntausender …', order: 1 },
                    { text: 'Die 7 steht an der 5. Stelle von rechts → Zehntausender', order: 2 },
                ],
                order: 1,
                difficulty: 'easy',
                xpReward: 5,
                isActive: true,
            },
            {
                // Single Choice
                challengeId: zahlenraum._id,
                title: 'Zahl richtig lesen',
                description: 'Wie lautet die Zahl 506.030 in Worten?',
                mode: 'mathematics',
                expectedAnswer: 'Fünfhundertsechstausend dreißig',
                choices: [
                    'Fünfhundertsechstausend dreißig',
                    'Fünftausend sechshundert dreißig',
                    'Fünfhundertsechzig dreißig',
                    'Fünfhundertsechstausend dreihundert',
                ],
                hints: [{ text: '506.030 → 506 Tausend und 030', order: 1 }],
                order: 2,
                difficulty: 'easy',
                xpReward: 5,
                isActive: true,
            },
            {
                // Rechenaufgabe – Freitext
                challengeId: zahlenraum._id,
                title: 'Zahlen runden',
                description: 'Runde 483.726 auf die nächste Tausenderstelle.',
                mode: 'mathematics',
                expectedAnswer: '484000',
                hints: [{ text: 'Schau auf die Hunderterstelle: 7 ≥ 5, also wird aufgerundet.', order: 1 }],
                order: 3,
                difficulty: 'easy',
                xpReward: 5,
                isActive: true,
            },
            {
                // Textaufgabe – Freitext
                challengeId: zahlenraum._id,
                title: 'Größte & kleinste Zahl',
                description: 'Welche ist die größte Zahl? 98.765 oder 102.340 oder 99.999?',
                mode: 'mathematics',
                expectedAnswer: '102340',
                choices: ['98765', '99999', '102340'],
                hints: [{ text: 'Vergleiche zuerst die Anzahl der Stellen!', order: 1 }],
                order: 4,
                difficulty: 'easy',
                xpReward: 5,
                isActive: true,
            },
            {
                // Textaufgabe
                challengeId: zahlenraum._id,
                title: 'Zahlen der Reihe nach',
                description: 'Ein Stadion fasst 47.500 Personen. Beim Spiel sind 38.260 Zuschauer da. Wie viele Plätze sind noch frei?',
                mode: 'mathematics',
                expectedAnswer: '9240',
                hints: [
                    { text: 'Freie Plätze = Gesamtplätze − anwesende Zuschauer', order: 1 },
                    { text: '47.500 − 38.260 = ?', order: 2 },
                ],
                order: 5,
                difficulty: 'medium',
                xpReward: 15,
                isActive: true,
            },
        ]);

        // ══════════════════════════════════════════════════════════════════════
        // 2. SCHRIFTLICHE ADDITION & SUBTRAKTION
        // ══════════════════════════════════════════════════════════════════════
        const addSub = await Challenge.create({
            title: 'Addition & Subtraktion',
            principle: 'Schriftliches Rechnen',
            description: 'Übe das schriftliche Addieren und Subtrahieren großer Zahlen',
            order: 2,
            isActive: true,
        });

        await Level.insertMany([
            {
                // Rechenaufgabe
                challengeId: addSub._id,
                title: 'Schriftlich addieren',
                description: 'Rechne: 34.768 + 25.493 = ?',
                mode: 'mathematics',
                expectedAnswer: '60261',
                hints: [{ text: 'Schreibe die Zahlen untereinander und addiere Stelle für Stelle von rechts.', order: 1 }],
                order: 1,
                difficulty: 'easy',
                xpReward: 5,
                isActive: true,
            },
            {
                // Rechenaufgabe
                challengeId: addSub._id,
                title: 'Schriftlich subtrahieren',
                description: 'Rechne: 73.204 − 28.567 = ?',
                mode: 'mathematics',
                expectedAnswer: '44637',
                hints: [{ text: 'Vergiss nicht den Übertrag (Borgen), wenn eine Stelle nicht reicht.', order: 1 }],
                order: 2,
                difficulty: 'medium',
                xpReward: 10,
                isActive: true,
            },
            {
                // Textaufgabe
                challengeId: addSub._id,
                title: 'Schulausflug',
                description: 'Die Schule hat 12.500 € Budget. Für den Bus werden 1.840 € bezahlt, für den Eintritt 3.275 €. Wie viel Geld bleibt übrig?',
                mode: 'mathematics',
                expectedAnswer: '7385',
                hints: [
                    { text: 'Erst alle Ausgaben zusammenrechnen: 1.840 + 3.275', order: 1 },
                    { text: 'Dann vom Budget abziehen: 12.500 − Ausgaben', order: 2 },
                ],
                order: 3,
                difficulty: 'medium',
                xpReward: 15,
                isActive: true,
            },
            {
                // Single Choice – Überschlag
                challengeId: addSub._id,
                title: 'Ergebnis schätzen',
                description: 'Welches Ergebnis ist ungefähr richtig für 49.830 + 31.150?',
                mode: 'mathematics',
                expectedAnswer: '81000',
                choices: ['61000', '71000', '81000', '91000'],
                hints: [{ text: 'Runde beide Zahlen auf Tausend: 50.000 + 31.000 = ?', order: 1 }],
                order: 4,
                difficulty: 'easy',
                xpReward: 5,
                isActive: true,
            },
            {
                // Textaufgabe
                challengeId: addSub._id,
                title: 'Bücherei',
                description: 'Eine Bücherei hat 156.430 Bücher. Es kommen 12.870 neue dazu und 9.540 werden ausgesondert. Wie viele Bücher hat die Bücherei jetzt?',
                mode: 'mathematics',
                expectedAnswer: '159760',
                hints: [
                    { text: '156.430 + 12.870 − 9.540 = ?', order: 1 },
                ],
                order: 5,
                difficulty: 'hard',
                xpReward: 25,
                isActive: true,
            },
        ]);

        // ══════════════════════════════════════════════════════════════════════
        // 3. SCHRIFTLICHE MULTIPLIKATION
        // ══════════════════════════════════════════════════════════════════════
        const multiplikation = await Challenge.create({
            title: 'Multiplikation',
            principle: 'Schriftliches Multiplizieren',
            description: 'Multipliziere mit ein- und zweistelligen Zahlen',
            order: 3,
            isActive: true,
        });

        await Level.insertMany([
            {
                // Rechenaufgabe
                challengeId: multiplikation._id,
                title: 'Mal Einmaleins',
                description: 'Rechne: 647 × 8 = ?',
                mode: 'mathematics',
                expectedAnswer: '5176',
                hints: [{ text: 'Multipliziere jede Stelle mit 8 und denk an den Übertrag.', order: 1 }],
                order: 1,
                difficulty: 'easy',
                xpReward: 5,
                isActive: true,
            },
            {
                // Single Choice
                challengeId: multiplikation._id,
                title: 'Ergebnis wählen',
                description: 'Was ergibt 356 × 7?',
                mode: 'mathematics',
                expectedAnswer: '2492',
                choices: ['2392', '2492', '2592', '2342'],
                hints: [{ text: '6×7=42, 5×7=35+4=39, 3×7=21+3=24 → 2492', order: 1 }],
                order: 2,
                difficulty: 'easy',
                xpReward: 5,
                isActive: true,
            },
            {
                // Textaufgabe
                challengeId: multiplikation._id,
                title: 'Schulbücher bestellen',
                description: 'Eine Schule bestellt für 24 Klassen je 28 Schulbücher. Wie viele Bücher werden insgesamt bestellt?',
                mode: 'mathematics',
                expectedAnswer: '672',
                hints: [
                    { text: '24 × 28 = ?', order: 1 },
                    { text: '24 × 20 = 480, 24 × 8 = 192, zusammen = ?', order: 2 },
                ],
                order: 3,
                difficulty: 'medium',
                xpReward: 15,
                isActive: true,
            },
            {
                // Rechenaufgabe – zweistelliger Multiplikator
                challengeId: multiplikation._id,
                title: 'Mal zweistellig',
                description: 'Rechne: 234 × 30 = ?',
                mode: 'mathematics',
                expectedAnswer: '7020',
                hints: [{ text: '234 × 3 = 702, dann × 10 (eine Null anhängen)', order: 1 }],
                order: 4,
                difficulty: 'medium',
                xpReward: 10,
                isActive: true,
            },
            {
                // Textaufgabe
                challengeId: multiplikation._id,
                title: 'Obststand',
                description: 'Ein Bauer verkauft täglich 145 Äpfel. Wie viele Äpfel verkauft er in 4 Wochen?',
                mode: 'mathematics',
                expectedAnswer: '4060',
                hints: [
                    { text: '4 Wochen = 4 × 7 = 28 Tage', order: 1 },
                    { text: '145 × 28 = ?', order: 2 },
                ],
                order: 5,
                difficulty: 'hard',
                xpReward: 25,
                isActive: true,
            },
        ]);

        // ══════════════════════════════════════════════════════════════════════
        // 4. SCHRIFTLICHE DIVISION
        // ══════════════════════════════════════════════════════════════════════
        const division = await Challenge.create({
            title: 'Division',
            principle: 'Schriftliches Dividieren',
            description: 'Teile Zahlen durch ein- und zweistellige Divisoren',
            order: 4,
            isActive: true,
        });

        await Level.insertMany([
            {
                // Rechenaufgabe
                challengeId: division._id,
                title: 'Einfach dividieren',
                description: 'Rechne: 648 ÷ 6 = ?',
                mode: 'mathematics',
                expectedAnswer: '108',
                hints: [{ text: 'Dividiere Stelle für Stelle von links: 6÷6=1, 4÷6 geht nicht, 48÷6=8', order: 1 }],
                order: 1,
                difficulty: 'easy',
                xpReward: 5,
                isActive: true,
            },
            {
                // Single Choice
                challengeId: division._id,
                title: 'Richtiges Ergebnis',
                description: 'Was ergibt 945 ÷ 9?',
                mode: 'mathematics',
                expectedAnswer: '105',
                choices: ['95', '100', '105', '115'],
                hints: [{ text: '9÷9=1, 4÷9 geht nicht → 0, 45÷9=5 → 105', order: 1 }],
                order: 2,
                difficulty: 'easy',
                xpReward: 5,
                isActive: true,
            },
            {
                // Rechenaufgabe mit Rest
                challengeId: division._id,
                title: 'Division mit Rest',
                description: 'Rechne: 437 ÷ 8 = ? Rest ? (Schreibe z.B. 54 R 5)',
                mode: 'mathematics',
                expectedAnswer: '54 R 5',
                hints: [
                    { text: '8 × 54 = 432, also bleibt 437 − 432 = 5 Rest', order: 1 },
                ],
                order: 3,
                difficulty: 'medium',
                xpReward: 10,
                isActive: true,
            },
            {
                // Textaufgabe
                challengeId: division._id,
                title: 'Kuchen verteilen',
                description: 'Für ein Schulfest werden 360 Kekse gebacken. Sie werden gleichmäßig auf 30 Teller verteilt. Wie viele Kekse liegen auf jedem Teller?',
                mode: 'mathematics',
                expectedAnswer: '12',
                hints: [{ text: '360 ÷ 30 = ? (Tipp: erst 360 ÷ 3, dann ÷ 10)', order: 1 }],
                order: 4,
                difficulty: 'medium',
                xpReward: 15,
                isActive: true,
            },
            {
                // Textaufgabe
                challengeId: division._id,
                title: 'Busfahrt',
                description: 'Für einen Ausflug fahren 168 Kinder mit. In jeden Bus passen 40 Kinder. Wie viele Busse werden mindestens gebraucht?',
                mode: 'mathematics',
                expectedAnswer: '5',
                choices: ['4', '5', '6', '7'],
                hints: [
                    { text: '168 ÷ 40 = 4 Rest 8 → der Rest braucht einen weiteren Bus', order: 1 },
                ],
                order: 5,
                difficulty: 'hard',
                xpReward: 25,
                isActive: true,
            },
        ]);

        // ══════════════════════════════════════════════════════════════════════
        // 5. MASSE & EINHEITEN (Länge, Gewicht, Zeit)
        // ══════════════════════════════════════════════════════════════════════
        const masse = await Challenge.create({
            title: 'Maße & Einheiten',
            principle: 'Länge, Gewicht & Zeit',
            description: 'Rechne mit Längen-, Gewichts- und Zeitmaßen um',
            order: 5,
            isActive: true,
        });

        await Level.insertMany([
            {
                // Single Choice – Längenmaße
                challengeId: masse._id,
                title: 'Längen umrechnen',
                description: 'Wie viel Zentimeter sind 3,5 Meter?',
                mode: 'mathematics',
                expectedAnswer: '350',
                choices: ['35', '350', '3500', '305'],
                hints: [{ text: '1 m = 100 cm → 3,5 × 100 = ?', order: 1 }],
                order: 1,
                difficulty: 'easy',
                xpReward: 5,
                isActive: true,
            },
            {
                // Rechenaufgabe – Gewicht
                challengeId: masse._id,
                title: 'Kilogramm und Gramm',
                description: 'Wie viele Gramm sind 2 kg 750 g?',
                mode: 'mathematics',
                expectedAnswer: '2750',
                hints: [{ text: '1 kg = 1000 g → 2 × 1000 + 750 = ?', order: 1 }],
                order: 2,
                difficulty: 'easy',
                xpReward: 5,
                isActive: true,
            },
            {
                // Textaufgabe – Zeit
                challengeId: masse._id,
                title: 'Wie lange dauert das?',
                description: 'Der Unterricht beginnt um 8:00 Uhr und endet um 12:45 Uhr. Wie lange dauert der Unterricht? (Antwort in Minuten)',
                mode: 'mathematics',
                expectedAnswer: '285',
                hints: [
                    { text: 'Von 8:00 bis 12:00 = 4 Stunden = 240 Minuten', order: 1 },
                    { text: 'Dazu kommen noch 45 Minuten: 240 + 45 = ?', order: 2 },
                ],
                order: 3,
                difficulty: 'medium',
                xpReward: 15,
                isActive: true,
            },
            {
                // Single Choice – Zeit
                challengeId: masse._id,
                title: 'Welche Einheit passt?',
                description: 'Max fährt mit dem Zug von Wien nach Salzburg. Welche Einheit passt am besten für die Reisedauer?',
                mode: 'mathematics',
                expectedAnswer: 'Stunden',
                choices: ['Sekunden', 'Minuten', 'Stunden', 'Tage'],
                hints: [{ text: 'Die Fahrt dauert etwa 2,5 – eine kurze oder lange Zeitspanne?', order: 1 }],
                order: 4,
                difficulty: 'easy',
                xpReward: 5,
                isActive: true,
            },
            {
                // Textaufgabe – Gewicht
                challengeId: masse._id,
                title: 'Einkauf wiegen',
                description: 'Lena kauft 3 Pakete Mehl à 1 kg und 500 g Zucker. Wie schwer ist ihre Einkaufstasche insgesamt in Gramm?',
                mode: 'mathematics',
                expectedAnswer: '3500',
                hints: [
                    { text: '3 × 1000 g + 500 g = ?', order: 1 },
                ],
                order: 5,
                difficulty: 'medium',
                xpReward: 15,
                isActive: true,
            },
            {
                // Rechenaufgabe – Meter und km
                challengeId: masse._id,
                title: 'Kilometer und Meter',
                description: 'Der Schulweg ist 2 km 340 m lang. Wie viele Meter sind das?',
                mode: 'mathematics',
                expectedAnswer: '2340',
                hints: [{ text: '1 km = 1000 m → 2 × 1000 + 340 = ?', order: 1 }],
                order: 6,
                difficulty: 'easy',
                xpReward: 5,
                isActive: true,
            },
        ]);

        // ══════════════════════════════════════════════════════════════════════
        // 6. GEOMETRIE – UMFANG
        // ══════════════════════════════════════════════════════════════════════
        const umfang = await Challenge.create({
            title: 'Umfang berechnen',
            principle: 'Geometrie – Umfang',
            description: 'Berechne den Umfang von Rechteck, Quadrat und anderen Figuren',
            order: 6,
            isActive: true,
        });

        await Level.insertMany([
            {
                // Single Choice
                challengeId: umfang._id,
                title: 'Formel für den Umfang',
                description: 'Welche Formel berechnet den Umfang eines Rechtecks?',
                mode: 'mathematics',
                expectedAnswer: 'U = 2 × (a + b)',
                choices: ['U = a × b', 'U = 2 × (a + b)', 'U = 4 × a', 'U = a + b'],
                hints: [{ text: 'Ein Rechteck hat 2 lange und 2 kurze Seiten.', order: 1 }],
                order: 1,
                difficulty: 'easy',
                xpReward: 5,
                isActive: true,
            },
            {
                // Rechenaufgabe
                challengeId: umfang._id,
                title: 'Rechteck – Umfang',
                description: 'Ein Rechteck ist 12 cm lang und 7 cm breit. Wie groß ist der Umfang in cm?',
                mode: 'mathematics',
                expectedAnswer: '38',
                hints: [{ text: 'U = 2 × (12 + 7) = 2 × 19 = ?', order: 1 }],
                order: 2,
                difficulty: 'easy',
                xpReward: 5,
                isActive: true,
            },
            {
                // Rechenaufgabe
                challengeId: umfang._id,
                title: 'Quadrat – Umfang',
                description: 'Ein Quadrat hat eine Seitenlänge von 9 cm. Wie groß ist sein Umfang in cm?',
                mode: 'mathematics',
                expectedAnswer: '36',
                hints: [{ text: 'U = 4 × a = 4 × 9 = ?', order: 1 }],
                order: 3,
                difficulty: 'easy',
                xpReward: 5,
                isActive: true,
            },
            {
                // Textaufgabe
                challengeId: umfang._id,
                title: 'Garten einzäunen',
                description: 'Ein rechteckiger Garten ist 15 m lang und 8 m breit. Wie viele Meter Zaun werden mindestens gebraucht?',
                mode: 'mathematics',
                expectedAnswer: '46',
                hints: [
                    { text: 'Der Zaun geht einmal rund um den Garten → Umfang berechnen', order: 1 },
                    { text: 'U = 2 × (15 + 8) = ?', order: 2 },
                ],
                order: 4,
                difficulty: 'medium',
                xpReward: 15,
                isActive: true,
            },
            {
                // Textaufgabe mit Rückwärtsrechnen
                challengeId: umfang._id,
                title: 'Seite gesucht',
                description: 'Ein Quadrat hat einen Umfang von 52 cm. Wie lang ist eine Seite?',
                mode: 'mathematics',
                expectedAnswer: '13',
                choices: ['11', '12', '13', '14'],
                hints: [{ text: 'U = 4 × a → a = U ÷ 4 = 52 ÷ 4 = ?', order: 1 }],
                order: 5,
                difficulty: 'medium',
                xpReward: 15,
                isActive: true,
            },
        ]);

        // ══════════════════════════════════════════════════════════════════════
        // 7. GEOMETRIE – FLÄCHENINHALT
        // ══════════════════════════════════════════════════════════════════════
        const flaeche = await Challenge.create({
            title: 'Flächeninhalt berechnen',
            principle: 'Geometrie – Fläche',
            description: 'Berechne den Flächeninhalt von Rechteck und Quadrat',
            order: 7,
            isActive: true,
        });

        await Level.insertMany([
            {
                // Single Choice
                challengeId: flaeche._id,
                title: 'Was ist ein cm²?',
                description: 'Was bedeutet die Einheit cm² (Quadratzentimeter)?',
                mode: 'mathematics',
                expectedAnswer: 'Ein Quadrat mit 1 cm Seitenlänge',
                choices: [
                    'Ein Quadrat mit 1 cm Seitenlänge',
                    'Eine Linie von 1 cm Länge',
                    'Ein Würfel mit 1 cm Kantenlänge',
                    'Ein Kreis mit 1 cm Durchmesser',
                ],
                hints: [{ text: 'Flächen werden in Quadraten gemessen.', order: 1 }],
                order: 1,
                difficulty: 'easy',
                xpReward: 5,
                isActive: true,
            },
            {
                // Rechenaufgabe
                challengeId: flaeche._id,
                title: 'Rechteck – Flächeninhalt',
                description: 'Ein Rechteck ist 14 cm lang und 6 cm breit. Wie groß ist sein Flächeninhalt in cm²?',
                mode: 'mathematics',
                expectedAnswer: '84',
                hints: [{ text: 'A = Länge × Breite = 14 × 6 = ?', order: 1 }],
                order: 2,
                difficulty: 'easy',
                xpReward: 5,
                isActive: true,
            },
            {
                // Rechenaufgabe
                challengeId: flaeche._id,
                title: 'Quadrat – Flächeninhalt',
                description: 'Ein Quadrat hat eine Seitenlänge von 11 cm. Wie groß ist sein Flächeninhalt in cm²?',
                mode: 'mathematics',
                expectedAnswer: '121',
                hints: [{ text: 'A = a × a = 11 × 11 = ?', order: 1 }],
                order: 3,
                difficulty: 'easy',
                xpReward: 5,
                isActive: true,
            },
            {
                // Textaufgabe
                challengeId: flaeche._id,
                title: 'Teppich kaufen',
                description: 'Ein Zimmer ist 5 m lang und 4 m breit. Wie groß muss der Teppich mindestens sein? (Antwort in m²)',
                mode: 'mathematics',
                expectedAnswer: '20',
                hints: [{ text: 'A = 5 × 4 = ?', order: 1 }],
                order: 4,
                difficulty: 'medium',
                xpReward: 15,
                isActive: true,
            },
            {
                // Textaufgabe – Vergleich
                challengeId: flaeche._id,
                title: 'Welche Fläche ist größer?',
                description: 'Rechteck A: 8 cm × 9 cm. Rechteck B: 6 cm × 12 cm. Welches hat den größeren Flächeninhalt?',
                mode: 'mathematics',
                expectedAnswer: 'Gleich groß',
                choices: ['Rechteck A', 'Rechteck B', 'Gleich groß'],
                hints: [
                    { text: 'Berechne beide Flächen: 8×9 und 6×12', order: 1 },
                    { text: '8×9 = 72 und 6×12 = 72', order: 2 },
                ],
                order: 5,
                difficulty: 'medium',
                xpReward: 15,
                isActive: true,
            },
            {
                // Textaufgabe – kombiniert
                challengeId: flaeche._id,
                title: 'Rasenmähen',
                description: 'Ein Garten ist 20 m lang und 12 m breit. In der Mitte steht ein Schuppen (4 m × 3 m). Wie viel m² Rasen muss gemäht werden?',
                mode: 'mathematics',
                expectedAnswer: '228',
                hints: [
                    { text: 'Gartenfläche: 20 × 12 = 240 m²', order: 1 },
                    { text: 'Schuppenfläche: 4 × 3 = 12 m² → 240 − 12 = ?', order: 2 },
                ],
                order: 6,
                difficulty: 'hard',
                xpReward: 25,
                isActive: true,
            },
        ]);

        // ══════════════════════════════════════════════════════════════════════
        // 8. BRUCHZAHLEN (nur 4. Schulstufe)
        // ══════════════════════════════════════════════════════════════════════
        const brueche = await Challenge.create({
            title: 'Bruchzahlen',
            principle: 'Brüche verstehen & vergleichen',
            description: 'Lerne Brüche kennen, lesen und vergleichen',
            order: 8,
            isActive: true,
        });

        await Level.insertMany([
            {
                // Single Choice – Grundbegriff
                challengeId: brueche._id,
                title: 'Was ist ein Bruch?',
                description: 'Eine Pizza wird in 8 gleiche Teile geschnitten. Du nimmst 3 Teile. Welcher Bruch beschreibt deinen Anteil?',
                mode: 'mathematics',
                expectedAnswer: '3/8',
                choices: ['8/3', '3/8', '5/8', '3/5'],
                hints: [{ text: 'Zähler = deine Teile, Nenner = alle Teile', order: 1 }],
                order: 1,
                difficulty: 'easy',
                xpReward: 5,
                isActive: true,
            },
            {
                // Single Choice – Vergleich
                challengeId: brueche._id,
                title: 'Brüche vergleichen',
                description: 'Was ist größer: 1/4 oder 1/6?',
                mode: 'mathematics',
                expectedAnswer: '1/4',
                choices: ['1/4', '1/6', 'Beide gleich'],
                hints: [{ text: 'Je größer der Nenner, desto kleiner der Teil!', order: 1 }],
                order: 2,
                difficulty: 'easy',
                xpReward: 5,
                isActive: true,
            },
            {
                // Rechenaufgabe
                challengeId: brueche._id,
                title: 'Brüche addieren',
                description: 'Rechne: 2/8 + 3/8 = ? (Kürze wenn möglich)',
                mode: 'mathematics',
                expectedAnswer: '5/8',
                hints: [{ text: 'Gleicher Nenner → Zähler addieren: 2 + 3 = 5, Nenner bleibt 8', order: 1 }],
                order: 3,
                difficulty: 'easy',
                xpReward: 5,
                isActive: true,
            },
            {
                // Single Choice – Hälfte, Viertel, Drittel
                challengeId: brueche._id,
                title: 'Bruchname kennen',
                description: 'Wie heißt der Bruch 1/3 in Worten?',
                mode: 'mathematics',
                expectedAnswer: 'ein Drittel',
                choices: ['ein Halb', 'ein Drittel', 'ein Viertel', 'ein Sechstel'],
                hints: [{ text: 'Der Nenner gibt den Namen: 2 = Halb, 3 = Drittel, 4 = Viertel …', order: 1 }],
                order: 4,
                difficulty: 'easy',
                xpReward: 5,
                isActive: true,
            },
            {
                // Textaufgabe
                challengeId: brueche._id,
                title: 'Schokolade teilen',
                description: 'Eine Tafel Schokolade hat 12 Stücke. Tim isst 1/4 davon. Wie viele Stücke isst er?',
                mode: 'mathematics',
                expectedAnswer: '3',
                hints: [
                    { text: '1/4 von 12 = 12 ÷ 4 = ?', order: 1 },
                ],
                order: 5,
                difficulty: 'medium',
                xpReward: 15,
                isActive: true,
            },
            {
                // Textaufgabe – Bruch von Menge
                challengeId: brueche._id,
                title: 'Klasse aufteilen',
                description: 'In einer Klasse sind 24 Kinder. 3/8 der Kinder haben ein Haustier. Wie viele Kinder haben ein Haustier?',
                mode: 'mathematics',
                expectedAnswer: '9',
                choices: ['6', '8', '9', '12'],
                hints: [
                    { text: '1/8 von 24 = 24 ÷ 8 = 3', order: 1 },
                    { text: '3/8 = 3 × 3 = ?', order: 2 },
                ],
                order: 6,
                difficulty: 'hard',
                xpReward: 25,
                isActive: true,
            },
        ]);

        // ══════════════════════════════════════════════════════════════════════
        // 9. SACHAUFGABEN & KOMBINIERTES RECHNEN
        // ══════════════════════════════════════════════════════════════════════
        const sachaufgaben = await Challenge.create({
            title: 'Sachaufgaben',
            principle: 'Kombiniertes Rechnen',
            description: 'Löse Textaufgaben mit mehreren Rechenschritten',
            order: 9,
            isActive: true,
        });

        await Level.insertMany([
            {
                // Textaufgabe
                challengeId: sachaufgaben._id,
                title: 'Taschengeld',
                description: 'Lisa bekommt jede Woche 5 € Taschengeld. Sie spart 8 Wochen lang. Dann kauft sie ein Buch um 18 €. Wie viel Geld hat sie danach noch?',
                mode: 'mathematics',
                expectedAnswer: '22',
                hints: [
                    { text: 'Erst: 8 × 5 € = Gesamtersparnis', order: 1 },
                    { text: 'Dann: Ersparnis − 18 € = ?', order: 2 },
                ],
                order: 1,
                difficulty: 'medium',
                xpReward: 15,
                isActive: true,
            },
            {
                // Single Choice
                challengeId: sachaufgaben._id,
                title: 'Welche Rechnung passt?',
                description: 'Tom hat 3 Schachteln mit je 24 Buntstiften. Er verschenkt 15 Stifte. Welche Rechnung ergibt die verbleibende Anzahl?',
                mode: 'mathematics',
                expectedAnswer: '3 × 24 − 15',
                choices: ['3 + 24 − 15', '3 × 24 − 15', '24 ÷ 3 − 15', '3 × 24 + 15'],
                hints: [{ text: 'Erst alle Stifte berechnen, dann die verschenkten abziehen.', order: 1 }],
                order: 2,
                difficulty: 'medium',
                xpReward: 10,
                isActive: true,
            },
            {
                // Textaufgabe
                challengeId: sachaufgaben._id,
                title: 'Klassenreise',
                description: 'Für eine Klassenreise zahlt jedes der 23 Kinder 45 €. Die Lehrerin zahlt nichts. Wie viel Geld wurde insgesamt eingesammelt?',
                mode: 'mathematics',
                expectedAnswer: '1035',
                hints: [{ text: '23 × 45 = ?', order: 1 }],
                order: 3,
                difficulty: 'medium',
                xpReward: 15,
                isActive: true,
            },
            {
                // Textaufgabe – mehrschrittig
                challengeId: sachaufgaben._id,
                title: 'Supermarkt',
                description: 'Mama kauft 3 Liter Milch à 1,20 € und 2 Packungen Butter à 2,40 €. Sie bezahlt mit einem 10-€-Schein. Wie viel Wechselgeld bekommt sie? (Antwort in Euro, z.B. 1,20)',
                mode: 'mathematics',
                expectedAnswer: '1,40',
                hints: [
                    { text: 'Milch: 3 × 1,20 € = 3,60 €', order: 1 },
                    { text: 'Butter: 2 × 2,40 € = 4,80 €', order: 2 },
                    { text: 'Gesamt: 3,60 + 4,80 = 8,40 € → 10,00 − 8,40 = ?', order: 3 },
                ],
                order: 4,
                difficulty: 'hard',
                xpReward: 25,
                isActive: true,
            },
            {
                // Textaufgabe
                challengeId: sachaufgaben._id,
                title: 'Sportfest',
                description: 'Beim Sportfest nehmen 8 Schulklassen teil. Jede Klasse hat 25 Kinder. Davon nehmen 3/5 am 100-m-Lauf teil. Wie viele Kinder laufen insgesamt?',
                mode: 'mathematics',
                expectedAnswer: '120',
                choices: ['100', '110', '120', '130'],
                hints: [
                    { text: 'Alle Kinder: 8 × 25 = 200', order: 1 },
                    { text: '3/5 von 200: 200 ÷ 5 × 3 = ?', order: 2 },
                ],
                order: 5,
                difficulty: 'hard',
                xpReward: 25,
                isActive: true,
            },
        ]);

        console.log("DONE SEEDING – 4. Klasse Volksschule Österreich");
        return res.status(200).json({ message: 'Seeding successfully' });
    } catch (err) {
        console.log("ERROR SEEDING", err);
        return res.status(500).json({ message: 'Seeding failed' });
    }
};

module.exports = {programming, mathematics};
