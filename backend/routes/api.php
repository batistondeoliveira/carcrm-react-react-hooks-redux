<?php

use App\Http\Controllers\api\AppController;
use App\Http\Controllers\api\NotesController;
use App\Http\Controllers\api\OwnersController;
use App\Http\Controllers\api\PayController;
use App\Http\Controllers\api\TransactionsController;
use App\Http\Controllers\api\UnitsController;
use App\Http\Controllers\api\uploads\LogoController;
use App\Http\Controllers\api\uploads\VehicleUploadController;
use App\Http\Controllers\api\VehiclesController;
use App\Http\Controllers\webservice\WebServiceController;
use Illuminate\Support\Facades\Route;

Route::apiResources([
    'vehicles' => VehiclesController::class,
    'notes' => NotesController::class,
    'owners' => OwnersController::class,
    'units' => UnitsController::class
]);

Route::resource('app', AppController::class);
Route::resource('transactions', TransactionsController::class)->only('index', 'show');

Route::prefix('pay')->group(function () {
    Route::get('plans', [PayController::class, 'plans']);    
    Route::post('card', [PayController::class, 'card']);    
    Route::post('pec', [PayController::class, 'pec']);    
});

Route::prefix('upload')->group(function () {
    Route::resource('vehicle', VehicleUploadController::class)->only(['store', 'update', 'destroy']);
    Route::resource('logo', LogoController::class)->only(['store', 'destroy']);
});

Route::get('vehicles/{vehicle_type}/brand', [VehiclesController::class, 'brand']);
Route::get('vehicles/{vehicle_type}/{vehicle_brand}/model', [VehiclesController::class, 'model']);
Route::get('vehicles/{vehicle_brand}/{vehicle_model}/version', [VehiclesController::class, 'version']);

Route::group(['prefix' => 'webservice'], function() {
    Route::post('cep', [WebServiceController::class, 'cep']);
});
