import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {CommonModule, NgOptimizedImage} from '@angular/common';

interface CollectRequest {
  id: number;
  type: string[];
  photos?: string[];
  weight: number;
  address: string;
  date: string;
  timeSlot: string;
  notes?: string;
  status: 'en attente' | 'validée' | 'rejetée';
}

@Component({
  selector: 'app-particulier-dashboard',
  standalone: true,
  imports: [
    ReactiveFormsModule, CommonModule, NgOptimizedImage
  ],
  templateUrl: './particulier-dashboard.component.html',
})

export class ParticulierDashboardComponent implements OnInit {

  user: any = {}; // Stocke les infos de l'utilisateur
  collectForm!: FormGroup;
  requests: CollectRequest[] = [];
  maxRequests = 3;
  maxWeight = 10_000; // 10kg max en grammes
  showForm: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getUser();
    this.initializeForm();
    this.loadRequests();
  }
  closeModal(event?: any): void {
    if (event) {
      event.stopPropagation(); // Prevents modal from closing if clicking inside the modal content.
    }
    this.showForm = false;
  }

  getUser(): void {
    // Simulation de récupération de l'utilisateur (via localStorage pour cet exemple)
    const storedUser = localStorage.getItem('currentUser');
    this.user = storedUser ? JSON.parse(storedUser) : { name: 'Utilisateur' };
  }

  initializeForm(): void {
    this.collectForm = this.fb.group({
      type: [[], Validators.required], // Sélection multiple
      photos: [[]], // Optionnel
      weight: [null, [Validators.required, Validators.min(1000)]], // Min 1000g
      address: ['', Validators.required],
      date: ['', Validators.required],
      timeSlot: ['', Validators.required],
      notes: ['']
    });
  }

  submitRequest(): void {
    if (this.collectForm.invalid) return;

    const totalWeight = this.requests.reduce((sum, req) => sum + req.weight, 0);
    if (totalWeight + this.collectForm.value.weight > this.maxWeight) {
      alert("Le total des collectes ne peut pas dépasser 10 kg.");
      return;
    }

    if (this.requests.length >= this.maxRequests) {
      alert("Vous ne pouvez pas avoir plus de 3 demandes simultanées.");
      return;
    }

    const newRequest: CollectRequest = {
      id: Date.now(),
      ...this.collectForm.value,
      status: 'en attente'
    };

    this.requests.push(newRequest);
    this.saveRequests();
    this.collectForm.reset();
    this.closeModal();
  }

  modifyRequest(request: CollectRequest): void {
    this.collectForm.patchValue(request);
    this.requests = this.requests.filter(req => req.id !== request.id);
    this.saveRequests();
  }

  deleteRequest(id: number): void {
    this.requests = this.requests.filter(req => req.id !== id);
    this.saveRequests();
  }

  loadRequests(): void {
    const storedRequests = localStorage.getItem('collectRequests');
    this.requests = storedRequests ? JSON.parse(storedRequests) : [];
  }

  saveRequests(): void {
    localStorage.setItem('collectRequests', JSON.stringify(this.requests));
  }

}
