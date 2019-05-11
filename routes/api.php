<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', 'API\PassportController@login');
Route::post('register', 'API\PassportController@register');

Route::middleware('auth:api')->group(function () {
    Route::get('user', 'API\PassportController@user');
    Route::get('logout', 'API\PassportController@logout');

    Route::get('/students', 'API\StudentController@index')->name('api.students.index');
    Route::get('/students/{id}', 'API\StudentController@show')->name('api.students.show');
    Route::post('/students', 'API\StudentController@store')->name('api.students.store');
    Route::put('/students/{id}', 'API\StudentController@update')->name('api.students.update');
    Route::delete('/students/{id}', 'API\StudentController@destroy')->name('api.student.delete');

    Route::get('/courses', 'API\CourseController@index')->name('api.courses.index');
    Route::get('/courses/{id}', 'API\CourseController@show')->name('api.courses.show');
    Route::post('/courses', 'API\CourseController@store')->name('api.courses.store');
    Route::put('/courses/{id}', 'API\CourseController@update')->name('api.courses.update');
    Route::delete('/courses/{id}', 'API\CourseController@destroy')->name('api.courses.delete');

    Route::get('/enrolments', 'API\EnrolmentController@index')->name('api.enrolments.index');
    Route::get('/enrolments/{id}', 'API\EnrolmentController@show')->name('api.enrolments.show');
    Route::post('/enrolments', 'API\EnrolmentController@store')->name('api.enrolments.store');
    Route::put('/enrolments/{id}', 'API\EnrolmentController@update')->name('api.enrolments.update');
    Route::delete('/enrolments/{id}', 'API\EnrolmentController@destroy')->name('api.enrolments.delete');



    // Route::resource('courses', 'API\CourseController')->except([
    //     'create', 'edit'
    // ]);
    // Route::resource('students', 'API\StudentController')->except([
    //     'create', 'edit'
    // ]);
    // Route::resource('enrolments', 'API\EnrolmentController')->except([
    //     'create', 'edit'
    // ]);
});
