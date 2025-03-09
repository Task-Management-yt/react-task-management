# Task Management App

## Deskripsi

Task Management App adalah aplikasi berbasis web yang membantu pengguna dalam mengelola tugas mereka. Aplikasi ini memungkinkan pengguna untuk membuat, mengedit, mencari, dan mengelompokkan tugas berdasarkan status.

## Fitur

- **Autentikasi Pengguna**: Pengguna dapat daftar, login, dan logout dari aplikasi.
- **Manajemen Tugas**:
  - Membuat tugas baru
  - Mengedit tugas yang sudah ada
  - Menandai tugas sebagai selesai
  - Mencari tugas berdasarkan judul atau deskripsi
- **Filter Tugas**:
  - Semua tugas
  - Tugas belum selesai
  - Tugas sedang berjalan
  - Tugas selesai
- **Navigasi yang Mudah**: Menggunakan React Router untuk navigasi halaman.
- **UI Responsif**: Menggunakan Bootstrap untuk tampilan yang responsif dan modern.

## Teknologi yang Digunakan

- **Frontend**: React.js, Bootstrap
- **Backend**: FastAPI
- **Database**: Supabase
- **State Management**: React Hooks

## Instalasi dan Menjalankan Aplikasi

### Prasyarat

Pastikan Anda sudah menginstal:

- Node.js dan npm

### Langkah-langkah

1. Clone repository ini:
   ```bash
   git clone https://github.com/Task-Management-yt/react-task-management.git
   cd react-task-management
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Jalankan aplikasi:
   ```bash
   npm start
   ```

## Struktur Proyek

```
Task-Management-App/
│── public/
│── src/
│   │── components/
│   │── pages/
│   │── services/
│   │── main.tsx
│── package.json
│── README.md
```
