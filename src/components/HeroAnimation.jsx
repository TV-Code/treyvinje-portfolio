export function HeroAnimation({ canvasRef }) {
    const ripples = [];
    let animationFrameId;
    const particles = [];

    const noParticleZone = {
        x: window.innerWidth / 2 - 200,
        y: window.innerHeight / 2 - 100,
        width: 400,
        height: 250,
    };

    const adjustColor = (size) => {
        const baseColor = { r: 0x6f, g: 0x97, b: 0xbd };
        const adjustmentRange = -100;
        const adjustmentFactor = ((size - 1) / 4) * 2 - 1;
        const adjustComponent = (component) => {
        const adjustment = adjustmentFactor * adjustmentRange;
    
        component += adjustment;
    
        return Math.max(0, Math.min(255, component));
        };
    
        const r = adjustComponent(baseColor.r);
        const g = adjustComponent(baseColor.g);
        const b = adjustComponent(baseColor.b);
    
        return `#${Math.floor(r).toString(16).padStart(2, '0')}${Math.floor(g).toString(16).padStart(2, '0')}${Math.floor(b).toString(16).padStart(2, '0')}`;
    };

    function lerp(start, end, t) {
        return start * (1 - t) + end * t;
    }
    
    class Particle {
        constructor(x, y, size, color, layer) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.layer = layer;
        this.color = color
        this.baseX = x;
        this.baseY = y;
        this.density = (Math.random() * 30) + 1;
        this.velocityX = (Math.random() - 0.5) * (5 - this.layer);
        this.velocityY = (Math.random() - 0.5) * (5 - this.layer);
        this.angle = Math.random() * Math.PI * 2;
        this.speed = (Math.random() * 0.2 - 0.1) / this.layer;
        this.distanceFromCenter = {
            x: Math.random() * (5 - this.layer) * 5,
            y: Math.random() * (5 - this.layer) * 5
        };
        this.lastMouse = { x: x, y: y };
        this.returning = false;
        }
    
        draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        }

        connect(particles, ctx) {
        particles.forEach(particle => {
            const dx = this.x - particle.x;
            const dy = this.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 120) {
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(particle.x, particle.y);
            ctx.stroke();
            }
        });
        }

        calculateRippleEffect(ripple, age) {
        const dx = this.x - ripple.x;
        const dy = this.y - ripple.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
    
        const rippleSize = age * 0.5;
    
        if (distance < rippleSize) {
            const effectMagnitude = Math.cos(distance / rippleSize * Math.PI) * 10;
            return {
            x: dx / distance * effectMagnitude,
            y: dy / distance * effectMagnitude
            };
        }
    
        return { x: 0, y: 0 };
        }

        update(mouse, globalAngle) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        
        let maxDistance = mouse.radius;
        
        let force = (maxDistance - distance) / maxDistance;
        force = Math.max(force, 0);
        
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;
        
        if (distance < mouse.radius) {
            this.x -= directionX;
            this.y -= directionY;
            this.returning = false;
        } else if (!this.returning) {
            this.returning = true;
            this.velocityX = 0;
            this.velocityY = 0;
        }
    
        if (this.returning) {
            this.x = lerp(this.x, this.baseX, 0.05);
            this.y = lerp(this.y, this.baseY, 0.05);
        }

        let sizeFactor = 1 + (this.size - 1) / 4;
    
        if (this.x !== this.baseX || this.y !== this.baseY) {
            this.angle += this.speed * sizeFactor;
            let baseX = this.baseX + Math.cos(this.angle) * this.distanceFromCenter.x;
            let baseY = this.baseY + Math.sin(this.angle) * this.distanceFromCenter.y;
    
            if (!this.returning) {
            this.x = lerp(this.x, baseX, 0.02);
            this.y = lerp(this.y, baseY, 0.02);
            }
            let globalOffsetX = Math.cos(globalAngle * sizeFactor) * .2;
            let globalOffsetY = Math.sin(globalAngle * sizeFactor) * .2;
            this.baseX += globalOffsetX;
            this.baseY += globalOffsetY;
        }
        
        if (this.x <= this.size || this.x >= canvas.width - this.size) {
            this.velocityX = -this.velocityX;
            this.x = this.x <= this.size ? this.size : canvas.width - this.size;
        }
        if (this.y <= this.size || this.y >= canvas.height - this.size) {
            this.velocityY = -this.velocityY;
            this.y = this.y <= this.size ? this.size : canvas.height - this.size;
        }
        
        this.velocityX *= this.layer;
        this.velocityY *= this.layer;
        
        this.lastMouse.x = mouse.x;
        this.lastMouse.y = mouse.y;

        ripples.forEach(ripple => {
            const age = Date.now() - ripple.created;
            if (age < 2500) {
            const rippleEffect = this.calculateRippleEffect(ripple, age);
            this.x += rippleEffect.x;
            this.y += rippleEffect.y;
            }
        });
        }
    }

    const mouse = {
        x: null,
        y: null,
        radius: 150
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    const handleMouseMove = (e) => {
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top + window.scrollY;
    }

    canvas.addEventListener('mousemove', handleMouseMove);

    const handleCanvasClick = (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        ripples.push({
        x: x,
        y: y,
        created: Date.now()
        });
    };

    canvas.addEventListener('click', handleCanvasClick);

    function debounce(func, timeout = 300){
        let timer;
        return (...args) => {
          clearTimeout(timer);
          timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
      }

    const handleResize = () => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    };
    
    window.addEventListener('resize', debounce(handleResize));

    const initParticles = () => {
        particles.length = 0;
        let numberOfParticles = (canvas.height * canvas.width) / 6000;
        for (let i = 0; i < numberOfParticles; i++) {
        let x, y;
        let layer = Math.floor(Math.random() * 4) + 1;
        let size = (5 - layer) * 1 + 1;
        let color = adjustColor(size);
    
        do {
            x = Math.random() * canvas.width;
            y = Math.random() * canvas.height;
        } while (
            x > noParticleZone.x && x < noParticleZone.x + noParticleZone.width &&
            y > noParticleZone.y && y < noParticleZone.y + noParticleZone.height
        );
    
        particles.push(new Particle(x, y, size, color, layer));
        }
    };
    
    
    let globalAngle = 0;

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        globalAngle += 0.005;

        for (let particle of particles) {
        particle.update(mouse, globalAngle);
        particle.draw(ctx, canvas.width);
        particle.connect(particles, ctx);
        }

        animationFrameId = requestAnimationFrame(animate);
    };
    

    initParticles();
    animate();

    return () => {
        const canvas = canvasRef.current;
        cancelAnimationFrame(animationFrameId);
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('click', handleCanvasClick);
        window.removeEventListener('resize', handleResize);
    };
};