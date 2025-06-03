<?php

use PHPUnit\Framework\TestCase;
use Slim\Factory\AppFactory;
use Slim\Psr7\Factory\ServerRequestFactory;

class ProjectControllerTest extends TestCase
{
    private $app;
    
    protected function setUp(): void
    {
        $this->app = AppFactory::create();
        
        // Configurar rutas
        $this->app->get('/api/projects', \Tonitf\Portafolio\Controllers\ProjectController::class . ':getAllProjects');
        $this->app->get('/api/projects/{id}', \Tonitf\Portafolio\Controllers\ProjectController::class . ':getProject');
    }
    
    public function testGetAllProjects()
    {
        $request = (new ServerRequestFactory())->createServerRequest('GET', '/api/projects');
        $response = $this->app->handle($request);
        
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('application/json', $response->getHeaderLine('Content-Type'));
        
        $body = (string) $response->getBody();
        $data = json_decode($body, true);
        
        $this->assertIsArray($data);
        $this->assertNotEmpty($data);
        
        // Verificar estructura del primer proyecto
        $firstProject = $data[0];
        $this->assertArrayHasKey('id', $firstProject);
        $this->assertArrayHasKey('title', $firstProject);
        $this->assertArrayHasKey('description', $firstProject);
        $this->assertArrayHasKey('technologies', $firstProject);
        $this->assertArrayHasKey('featured', $firstProject);
    }
    
    public function testGetProjectById()
    {
        $request = (new ServerRequestFactory())->createServerRequest('GET', '/api/projects/1');
        $response = $this->app->handle($request);
        
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('application/json', $response->getHeaderLine('Content-Type'));
        
        $body = (string) $response->getBody();
        $data = json_decode($body, true);
        
        $this->assertArrayHasKey('id', $data);
        $this->assertArrayHasKey('title', $data);
        $this->assertArrayHasKey('long_description', $data);
        $this->assertEquals(1, $data['id']);
    }
    
    public function testGetNonExistentProject()
    {
        $request = (new ServerRequestFactory())->createServerRequest('GET', '/api/projects/999');
        $response = $this->app->handle($request);
        
        $this->assertEquals(404, $response->getStatusCode());
        
        $body = (string) $response->getBody();
        $data = json_decode($body, true);
        
        $this->assertArrayHasKey('error', $data);
    }
}
