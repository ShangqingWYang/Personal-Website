'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function Globe() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // === Scene, Camera, Renderer ===
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000010); // dark space background

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // === Controls for rotation (optional, for interaction) ===
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = true;
    controls.rotateSpeed = 0.3;

    // === Lights ===
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 3, 5);
    scene.add(pointLight);

    // === Globe ===
    const globeGeometry = new THREE.SphereGeometry(2, 128, 128);

    const textureLoader = new THREE.TextureLoader();
    const globeMaterial = new THREE.MeshStandardMaterial({
      map: textureLoader.load('/earth_daymap.jpg'),          // high-res day map with countries
      bumpMap: textureLoader.load('/earth_bump.jpg'),        // optional bump map for mountains
      bumpScale: 0.05,
      specularMap: textureLoader.load('/earth_specular.jpg'),// optional for ocean reflection
      specular: new THREE.Color('grey'),
    });

    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);

    // === Stars ===
    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 3000;
    const starVertices: number[] = [];
    for (let i = 0; i < starCount; i++) {
      starVertices.push(
        (Math.random() - 0.5) * 400,
        (Math.random() - 0.5) * 400,
        (Math.random() - 0.5) * 400
      );
    }
    starsGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(starVertices, 3)
    );
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.05 });
    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);

    // === Animate ===
    const animate = () => {
      requestAnimationFrame(animate);
      globe.rotation.y += 0.0015; // smooth rotation
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // === Handle Resize ===
    const handleResize = () => {
      if (!mountRef.current) return;
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-screen flex justify-center items-center"
    ></div>
  );
}
