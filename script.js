const canvas = document.getElementById('background-canvas');
        const ctx = canvas.getContext('2d');
        let particlesArray;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let mouse = {
            x: null,
            y: null,
            radius: (canvas.height/80) * (canvas.width/80)
        }

        window.addEventListener('mousemove', 
            function(event) {
                mouse.x = event.x;
                mouse.y = event.y;
            }
        );

        class Particle {
            constructor(x, y, directionX, directionY, size, color) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
            update() {
                if (this.x > canvas.width || this.x < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.directionY = -this.directionY;
                }
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx*dx + dy*dy);
                if (distance < mouse.radius + this.size){
                    if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                        this.x += 10;
                    }
                    if (mouse.x > this.x && this.x > this.size * 10) {
                        this.x -= 10;
                    }
                    if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                        this.y += 10;
                    }
                    if (mouse.y > this.y && this.y > this.size * 10) {
                        this.y -= 10;
                    }
                }
                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }

        function init() {
            particlesArray = [];
            let numberOfParticles = (canvas.height * canvas.width) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 5) + 1;
                let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
                let directionX = (Math.random() * 5) - 2.5;
                let directionY = (Math.random() * 5) - 2.5;
                let color = '#' + Math.floor(Math.random()*16777215).toString(16);
                
                particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
            }
        }

        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, innerWidth, innerHeight);
            
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
        }

        window.addEventListener('resize', 
            function() {
                canvas.width = innerWidth;
                canvas.height = innerHeight;
                mouse.radius = ((canvas.height/80) * (canvas.height/80));
                init();
            }
        );

        window.addEventListener('mouseout',
            function() {
                mouse.x = undefined;
                mouse.y = undefined;
            }
        )

        init();
        animate();

        // File analysis functions
        function showLoading() {
            document.getElementById('loading').style.display = 'block';
            document.getElementById('result').classList.remove('show');
        }

        function hideLoading() {
            document.getElementById('loading').style.display = 'none';
        }

        function showResult(prediction) {
            const resultElement = document.getElementById('result');
            const isFake = prediction > 0.5;
            resultElement.textContent = isFake ? 'FAKE' : 'REAL';
            resultElement.style.color = isFake ? '#FF4136' : '#2ECC40';
            resultElement.style.backgroundColor = isFake ? 'rgba(255,65,54,0.2)' : 'rgba(46,204,64,0.2)';
            resultElement.classList.add('show');
        }

        function analyzeFile(endpoint) {
            const input = document.getElementById(`${endpoint.split('_')[1]}Input`);
            const file = input.files[0];
            if (file) {
                showLoading();
                const formData = new FormData();
                formData.append('file', file);
                
                fetch(`/${endpoint}`, {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    hideLoading();
                    showResult(data.prediction[0]);
                })
                .catch(error => {
                    console.error('Error:', error);
                    hideLoading();
                    alert('An error occurred during analysis. Please try again.');
                });
            } else {
                alert('Please select a file first.');
            }
        }

        function analyzeImage() {
            analyzeFile('analyze_image');
        }

        function analyzeAudio() {
            analyzeFile('analyze_audio');
        }

        function analyzeVideo() {
            analyzeFile('analyze_video');
        }

        // Update file input labels
        document.querySelectorAll('input[type="file"]').forEach(input => {
            input.addEventListener('change', function(e) {
                const fileName = e.target.files[0].name;
                const label = this.previousElementSibling;
                label.textContent = fileName.length > 20 ? fileName.substring(0, 17) + '...' : fileName;
            });
        });
document.querySelectorAll('.scroll-link').forEach(link => {
    link.addEventListener('click', event => {
    event.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
});
});