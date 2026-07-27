    document.addEventListener('DOMContentLoaded', function() {
        const passwordInput = document.getElementById('password-input');
        const strengthResult = document.getElementById('strength-result');
        const reqLength = document.getElementById('req-length');
        const reqUpper = document.getElementById('req-upper');
        const reqLower = document.getElementById('req-lower');
        const reqNumber = document.getElementById('req-number');
        const reqSymbol = document.getElementById('req-symbol');
        const seg1 = document.getElementById('seg-1');
        const seg2 = document.getElementById('seg-2');
        const seg3 = document.getElementById('seg-3');
        const seg4 = document.getElementById('seg-4');
        const segments = [seg1, seg2, seg3, seg4];
        passwordInput.addEventListener('input', function() {
            const password = passwordInput.value;
            const checks = {
                length: password.length >= 15,
                upper: /[A-Z]/.test(password),
                lower: /[a-z]/.test(password),
                number: /[0-9]/.test(password),
                symbol: /[^A-Za-z0-9]/.test(password)
            };
            updateRuleUI(reqLength, checks.length);
            updateRuleUI(reqUpper, checks.upper);
            updateRuleUI(reqLower, checks.lower);
            updateRuleUI(reqNumber, checks.number);
            updateRuleUI(reqSymbol, checks.symbol);
const customBlacklist = [
             "1980", "1981", "1982", "1983", "1984", "1985", "1986", "1987", "1988", "1989", "1990", "1991",
             "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003",
             "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015",
             "joao", "joão", "jose", "josé", "ze", "zé","silveira", "silva", "santos", "oliveira", "souza", "rodrigues", 
             "ferreira", "alves", "pereira", "lima", "gomes", "costa", "ribeiro", 
             "martins", "carvalho", "almeida", "lopes", "soares", "fernandes", 
             "pedro", "maria", "murilo", "lucas", "gabriel", "davi", "felipe", "carlos", "ana",
             "fernandes", "fernanda", "vinicius", "helen", "elen", "helena",
             "morgana", "gorete", "gorethe", "lucia", "lúcia", "socorro",
             "paula", "mariana", "maryana", "maryanna", "marianna", "phillipe",
             "philipe", "filipe", "couto", "coutto", "menezes", "meneses", "lorena",
             "biel", "victor", "clara", "joana", "paulo", "vicente", "mayara", "maiara",
             "maiza", "mayza", "maisa", "maysa", "maraisa", "francisco", "adriana", "chico",
             "antônio", "anthony", "antony", "antonio", "andre", "andré", "guedes",
             "geraldo", "manuel", "ana", "natan", "nathan", "natã", "aparecida",
             "cida", "lourdes", "fatima", "fátima", "zezin", "chagas", "dores", 
             "conceicao", "conceiçao", "conceição", "julia", "julio", "júlia", "maju", "júlio",
             "juju", "junior", "filho", "cecília", "cecilia", "carlos", "carla", "karla", "karlos", "carlinha", "carlinhos",
             "marcos", "rafael", "rafaela", "gabriela", "gaby", "gabizinha", "emanuela", "manu",
             "eduardo", "eduarda", "duda", "nanda", "rafa",
              "oi", "oigente", "bonito", "lindo", "como","tchau", "tchaugente", "administrador", "vasco", "ola", "amazonas", "pará", "para", "roraima",
              "rondonia", "rondônia", "acre", "tocantins", "alagoas", "bahia", "ceara", "ceará",
              "maranhao", "maranhão", "paraiba", "paraíba", "pernambuco", "piaui", "rio grande",
              "distrito", "matogrosso", "matogrossodosul", "minas", "minasgerais", "espiritosanto",
              "rio", "riodejaneiro", "parana", "paraná", "santacatarina", "sul", "nordeste", "norte",
              "sudeste", "centrooeste", "grêmio", "gremio", "flamenguista", "vascaino", "vascaíno",
              "olá", "pizzaria", 
              "brasil", "senha", "mudar", "entrar", "usuario", "123456", "123456789", 
              "futebol", "flamengo", "corinthians", "palmeiras", "saopaulo",
              "admin", "administrator", "password", "qwerty", "qwertyuiop", "asdfghjkl", "zxcvbnm",
              "welcome", "secret", "hello", "johndoe", "iloveyou", "princess", "test",
              "helloworld", "love", "azerty", "poiuytrewq", "football", "soccer",
              "dallas", "dallascowboys", "ravens", "kansas", "kansascity", "buffalo",
              "buffalobills", "chiefs", "lasvegas", "philadelphia", "philadelphiaeagles", 
              "company", "corporate", "support", "office", "network", "server", 
              "john", "smith", "johnson", "williams", "brown", "jones", "miller", 
              "davis", "garcia", "rodriguez", "wilson", "martinez", "anderson", 
              "thomas", "taylor", "moore", "jackson", "martin", "lee", "thompson",
              "dallascowboy", "......", "catowner", "cat", "carowner", "carlover",
              "dogowner", "dick", "pussy",
            ];
            const analysis = zxcvbn(password, customBlacklist);
            let score = analysis.score;
            const lowerPassword = password.toLowerCase();
            for (let i = 0; i < customBlacklist.length; i++) {
                const forbiddenWord = customBlacklist[i];
                if (forbiddenWord.length > 4 && lowerPassword.includes(forbiddenWord)) {
                if (score > 1) {
                 score = 1; 
             }
                break; 
    }
}
            segments.forEach(seg => {
                if (seg) seg.style.backgroundColor = '#e2e8f0';
            });
            if (password.length === 0) {
                strengthResult.textContent = 'Too Short ❌';
                strengthResult.style.color = '#64748b';
                return;
            }
            if (score === 0 || score === 1) {
                strengthResult.textContent = 'Weak 🔴';
                strengthResult.style.color = '#ef4444';
                if (seg1) seg1.style.backgroundColor = '#ef4444';
            } 
            else if (score === 2) {
                strengthResult.textContent = 'Fair 🟡';
                strengthResult.style.color = '#f59e0b';
                if (seg1) seg1.style.backgroundColor = '#f59e0b';
                if (seg2) seg2.style.backgroundColor = '#f59e0b';
            } 
            else if (score === 3) {
                strengthResult.textContent = 'Good 🔵';
                strengthResult.style.color = '#2b8dfc';
                if (seg1) seg1.style.backgroundColor = '#2b8dfc';
                if (seg2) seg2.style.backgroundColor = '#2b8dfc';
                if (seg3) seg3.style.backgroundColor = '#2b8dfc';
            } 
            else if (score === 4) {
                if (checks.length) {
                    strengthResult.textContent = 'Strong 🟢';
                    strengthResult.style.color = '#16a34a';
                    segments.forEach(seg => {
                        if (seg) seg.style.backgroundColor = '#16a34a';
                    });
                } else {
                    strengthResult.textContent = 'Good 🔵';
                    strengthResult.style.color = '#2b8dfc';
                    if (seg1) seg1.style.backgroundColor = '#2b8dfc';
                    if (seg2) seg2.style.backgroundColor = '#2b8dfc';
                    if (seg3) seg3.style.backgroundColor = '#2b8dfc';
                }
            }
        });
        function updateRuleUI(element, isValid) {
            if (!element) return;
            const iconSpan = element.querySelector('.req-icon');
            if (isValid) {
                element.classList.add('valid');
                element.style.color = '#16a34a';
                element.style.fontWeight = '500';
                if (iconSpan) iconSpan.textContent = '🟢';
            } else {
                element.classList.remove('valid');
                element.style.color = '#64748b';
                element.style.fontWeight = 'normal';
                if (iconSpan) iconSpan.textContent = '⚪';
            }
        }
    });