const Challenge = require("../models/challenge");
const Level = require("../models/level");

const seed = async (req, res) => {
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
        await Level.insertMany([
            // Block based level
            {
                challengeId: variables._id,
                title: 'Meine erste Variable',
                description: 'Speichere die Ziffer 3 in Variable x',
                mode: 'blocks',
                starterBlocks: [
                    'int ', 'x ', '= ', '3', ';'
                ],
                hints: [{text: 'Vergiss nicht, am Ende `;` einzufügen', order: 1}],
                solutions: [
                    {mode: 'blocks', code: 'int x = 3;', isCorrect: true, feedback: 'Das hast du super gelöst!'},
                ],
                order: 1,
                isActive: true,
                xpReward: 10,
                difficulty: 'easy',
            },
            {
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
            },
            {
                challengeId: variables._id,
                title: 'Variable ausgeben',
                description: 'Gib den Wert von x aus',
                mode: 'code',
                starterCode: 'console.log(',
                expectedOutput: '3',
                hints: [{text: 'Nutze console.log(x);', order: 1}],
                solutions: [
                    {mode: 'code', code: 'console.log(x);', isCorrect: true}
                ],
                order: 2,
                isActive: true,
                xpReward: 10,
                difficulty: 'easy',
            },
            {
                challengeId: variables._id,
                title: 'Mehrere Variablen',
                description: 'Erstelle y = 5 und gib x + y aus',
                mode: 'code',
                starterCode: 'int x = 3;\nint y = ',
                expectedOutput: '8',
                hints: [{text: 'Vergiss nicht, beide Variablen zu deklarieren', order: 1}],
                solutions: [
                    {mode: 'code', code: 'int x = 3;\nint y = 5;\nconsole.log(x + y);', isCorrect: true}
                ],
                order: 3,
                isActive: false,
                difficulty: 'medium',
                xpReward: 20,
            }
        ]);

        /* Loops */
        const loops = await Challenge.create({
            title: 'Schleifen',
            principle: 'Schleifen',
            description: 'Lerne for- und while-Schleifen zu verwenden',
            order: 2,
            isActive: true,
        });
        await Level.insertMany([
            {
                challengeId: loops._id,
                title: 'Einfache for-Schleife',
                description: 'Gib Zahlen von 1 bis 5 aus',
                mode: 'code',
                starterCode: 'for (let i = 1; i <= 5; i++) {\n  \n}',
                expectedOutput: '1\n2\n3\n4\n5',
                hints: [
                    {text: 'Denke an console.log()', order: 1},
                    {text: 'Die Schleife muss bei 5 enden', order: 2}
                ],
                solutions: [
                    {mode: 'code', code: 'for (let i = 1; i <= 5; i++) { console.log(i); }', isCorrect: true}
                ],
                order: 1,
                isActive: true,
                difficulty: 'easy',
                xpReward: 10,
            },
            {
                challengeId: loops._id,
                title: 'Schleifen mit Bedingung',
                description: 'Gib nur gerade Zahlen von 1 bis 10 aus',
                mode: 'code',
                starterCode: 'for (let i = 1; i <= 10; i++) {\n  \n}',
                expectedOutput: '2\n4\n6\n8\n10',
                hints: [{text: 'Nutze i % 2 === 0', order: 1}],
                solutions: [
                    {
                        mode: 'code',
                        code: 'for (let i = 1; i <= 10; i++) { if(i%2===0) console.log(i); }',
                        isCorrect: true
                    }
                ],
                order: 2,
                isActive: false,
                xpReward: 20,
                difficulty: 'medium',
            }
        ]);

        /* Conditionals */
        const conditionals = await Challenge.create({
            title: 'Bedingungen',
            principle: 'if/else',
            description: 'Lerne if-else und Vergleichsoperatoren',
            order: 3,
            isActive: true,
        });
        await Level.insertMany([
            {
                challengeId: conditionals._id,
                title: 'Einfache Bedingung',
                description: 'Wenn x > 5, gib "groß" aus, sonst "klein"',
                mode: 'code',
                starterCode: 'let x = 7;\nif (',
                expectedOutput: 'groß',
                hints: [{text: 'Überprüfe if(x > 5)', order: 1}],
                solutions: [
                    {
                        mode: 'code',
                        code: 'let x = 7;\nif(x > 5){console.log("groß");} else {console.log("klein");}',
                        isCorrect: true
                    }
                ],
                order: 1,
                difficulty: 'easy',
                xpReward: 10,
                isActive: true
            },
            {
                challengeId: conditionals._id,
                title: 'Mehrere Bedingungen',
                description: 'Wenn x>5 gib "groß", x===5 "mittel", sonst "klein"',
                mode: 'code',
                starterCode: 'let x = 5;\n',
                expectedOutput: 'mittel',
                hints: [{text: 'Nutze if/else if/else', order: 1}],
                solutions: [
                    {
                        mode: 'code',
                        code: 'let x=5;\nif(x>5){console.log("groß");} else if(x===5){console.log("mittel");} else {console.log("klein");}',
                        isCorrect: true
                    }
                ],
                order: 2,
                difficulty: 'medium',
                xpReward: 20,
                isActive: false
            }
        ]);

        /* Functions */
        const functionsChallenge = await Challenge.create({
            title: 'Funktionen',
            principle: 'Funktionen',
            description: 'Lerne Funktionen zu erstellen und aufzurufen',
            order: 4,
            isActive: true,
        });
        await Level.insertMany([
            {
                challengeId: functionsChallenge._id,
                title: 'Einfache Funktion',
                description: 'Erstelle eine Funktion add(a,b), die a+b zurückgibt',
                mode: 'code',
                starterCode: 'function add(a, b) {\n  ',
                hints: [{text: 'return nicht vergessen', order: 1}],
                solutions: [
                    {mode: 'code', code: 'function add(a,b){return a+b;}', isCorrect: true}
                ],
                order: 1,
                difficulty: 'easy',
                xpReward: 10,
                isActive: true
            },
            {
                challengeId: functionsChallenge._id,
                title: 'Funktion aufrufen',
                description: 'Rufe add(2,3) auf und gib das Ergebnis aus',
                mode: 'code',
                starterCode: 'console.log(',
                expectedOutput: '5',
                hints: [{text: 'Nutze console.log(add(2,3));', order: 1}],
                solutions: [
                    {mode: 'code', code: 'console.log(add(2,3));', isCorrect: true}
                ],
                order: 2,
                difficulty: 'medium',
                xpReward: 20,
                isActive: false
            }
        ]);

        /* Arrays */
        const arrays = await Challenge.create({
            title: 'Arrays',
            principle: 'Arrays',
            description: 'Lerne Arrays zu erstellen, zu durchlaufen und Werte auszulesen',
            order: 5,
            isActive: true,
        });
        await Level.insertMany([
            {
                challengeId: arrays._id,
                title: 'Ein Array erstellen',
                description: 'Erstelle ein Array mit Zahlen 1 bis 5',
                mode: 'code',
                starterCode: 'let arr = [',
                expectedOutput: '[1,2,3,4,5]',
                hints: [{text: 'Nutze eckige Klammern', order: 1}],
                solutions: [
                    {mode: 'code', code: 'let arr=[1,2,3,4,5];', isCorrect: true}
                ],
                order: 1,
                difficulty: 'easy',
                xpReward: 10,
                isActive: true
            },
            {
                challengeId: arrays._id,
                title: 'Array durchlaufen',
                description: 'Gib alle Elemente des Arrays aus',
                mode: 'code',
                starterCode: 'for(let i=0;i<arr.length;i++){',
                expectedOutput: '1\n2\n3\n4\n5',
                hints: [{text: 'Nutze console.log(arr[i])', order: 1}],
                solutions: [
                    {mode: 'code', code: 'for(let i=0;i<arr.length;i++){console.log(arr[i]);}', isCorrect: true}
                ],
                order: 2,
                difficulty: 'medium',
                xpReward: 20,
                isActive: false
            },
            {
                challengeId: arrays._id,
                title: 'Array mit forEach',
                description: 'Gib alle Elemente mit forEach aus',
                mode: 'code',
                starterCode: 'arr.forEach((x) => {',
                expectedOutput: '1\n2\n3\n4\n5',
                hints: [{text: 'Nutze console.log(x) innerhalb der Funktion', order: 1}],
                solutions: [
                    {mode: 'code', code: 'arr.forEach((x)=>{console.log(x);});', isCorrect: true}
                ],
                order: 3,
                difficulty: 'hard',
                xpReward: 50,
                isActive: false
            }
        ]);

        console.log("DONE SEEDING")
        return res.status(200).json({message: 'Seeding successfully'});
    } catch (err) {
        console.log("ERROR SEEDING")
        return res.status(500).json({message: 'Seeding failed'})
    }
}

module.exports = {seed}