    document.addEventListener('DOMContentLoaded', () => {
        
        const sections = document.querySelectorAll('section');
        const nav = document.getElementById('nav');
        
        sections.forEach(sec => {
            if(sec.id === 'comments') return;
            const li = document.createElement('li');
            li.innerHTML = `<a href="#${sec.id}">${sec.id.replace('sec','Section ')}</a>`;
            nav.appendChild(li);
        });

        
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                document.querySelector(link.getAttribute('href'))
                    .scrollIntoView({behavior: 'smooth'});
            });
        });


        window.addEventListener('scroll', () => {
            sections.forEach(sec => {
                const rect = sec.getBoundingClientRect();
                sec.classList.toggle('active', rect.top <= 150 && rect.bottom >= 150);
            });
        });

        
        document.getElementById('form').addEventListener('submit', e => {
            e.preventDefault();
            const user = document.getElementById('user').value.trim();
            const mail = document.getElementById('mail').value.trim();
            const msg = document.getElementById('msg').value.trim();

            if(!user || !mail || !msg) return showError('All fields required');
            if(!mail.includes('@')) return showError('Invalid email');
            
            document.getElementById('output').innerHTML += `
                <div class="comment">
                    <h4>${user}</h4>
                    <p>${msg}</p>
                    <small>${mail}</small>
                </div>
            `;
            
            e.target.reset();
            document.getElementById('error').textContent = '';
        });

        function showError(text) {
            document.getElementById('error').textContent = text;
        }
    });
