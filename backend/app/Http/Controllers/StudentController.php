<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Student;

class StudentController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->get('search');

        $students = Student::when($search, function ($query) use ($search) {
            return $query->search($search);
        })->paginate(8)->appends(['search' => $search]);

        return response()->json([
            'data' => $students->items(),
            'meta' => [
                'current_page' => $students->currentPage(),
                'last_page' => $students->lastPage(),
                'per_page' => $students->perPage(),
                'total' => $students->total(),
            ],
            'search' => $search,
        ], 200);
    }

    public function create(Request $request)
    {
        $search = $request->get('search');
        $page = $request->get('page', 1);

        $students = Student::when($search, function ($query) use ($search) {
            return $query->search($search);
        })->paginate(10)->appends(['search' => $search, 'page' => $page]);

        return response()->json([
            'data' => $students->items(),
            'meta' => [
                'current_page' => $students->currentPage(),
                'last_page' => $students->lastPage(),
                'per_page' => $students->perPage(),
                'total' => $students->total(),
            ],
            'showCreate' => true,
            'search' => $search,
            'currentPage' => $page,
        ], 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:students,email',
            'phone' => 'nullable|string|max:20',
        ]);

        $student = Student::create($validated);

        return response()->json([
            'message' => 'Student created successfully!',
            'student' => $student,
        ], 201);
    }

    public function show(Request $request, $id)
    {
        $search = $request->get('search');
        $page = $request->get('page', 1);

        $students = Student::when($search, function ($query) use ($search) {
            return $query->search($search);
        })->paginate(10)->appends(['search' => $search, 'page' => $page]);

        $showStudent = Student::findOrFail($id);
        return response()->json([
            'data' => $showStudent,
            'listing' => $students->items(),
            'meta' => [
                'current_page' => $students->currentPage(),
                'last_page' => $students->lastPage(),
                'per_page' => $students->perPage(),
                'total' => $students->total(),
            ],
            'search' => $search,
            'currentPage' => $page,
        ], 200);
    }

    public function edit(Request $request, $id)
    {
        $search = $request->get('search');
        $page = $request->get('page', 1);

        $students = Student::when($search, function ($query) use ($search) {
            return $query->search($search);
        })->paginate(10)->appends(['search' => $search, 'page' => $page]);

        $editStudent = Student::findOrFail($id);
        return response()->json([
            'edit' => $editStudent,
            'listing' => $students->items(),
            'meta' => [
                'current_page' => $students->currentPage(),
                'last_page' => $students->lastPage(),
                'per_page' => $students->perPage(),
                'total' => $students->total(),
            ],
            'search' => $search,
            'currentPage' => $page,
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $student = Student::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:students,email,' . $id,
            'phone' => 'nullable|string|max:20',
        ]);

        $student->update($validated);

        return response()->json([
            'message' => 'Student updated successfully!',
            'student' => $student,
        ], 200);
    }

    public function destroy(Request $request, $id)
    {
        $student = Student::findOrFail($id);
        $student->delete();

        return response()->json([
            'message' => 'Student deleted successfully!',
        ], 200);
    }
}
