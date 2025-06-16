import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Credential } from '../models/user/Credential';
import { Router } from '@angular/router';
import { Token } from '../models/user/Token';
import { StorageService } from '../services/storage.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule],
})
export class LoginComponent {
  constructor(
    private userService: UserService,
    private storageService: StorageService,
    private router: Router
  ) {}

  email: string = 'wikiman.123';
  password: string = '123';
  myLogin = new Token();

  callLogin() {
  const myCredential = new Credential();
  myCredential.username = this.email;
  myCredential.password = this.password;

  this.userService.postLogin(myCredential).subscribe(
    (data: any) => {
      console.log('✅ Usuario logueado:', data);

      this.myLogin = data; // ⬅️ Guardamos la respuesta completa por si se quiere usar después

      const token = data.accessToken;
      console.log('🔐 Token recibido:', token);

      // Guardamos token y usuario en la sesión
      this.storageService.setSession('user', myCredential.username);
      this.storageService.setSession('token', token);

      // Redirigimos
      this.router.navigate(['/home']);
    },
    (error) => {
      console.log('❌ Error en login:', error);
      myCredential.username = '';
      myCredential.password = '';
      alert(error);
    }
  );
}}
