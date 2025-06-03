<?php

use PHPUnit\Framework\TestCase;
use Slim\Factory\AppFactory;
use Slim\Psr7\Factory\ServerRequestFactory;

class PortfolioControllerTest extends TestCase
{
    private $app;
    
    protected function setUp(): void
    {
        $this->app = AppFactory::create();
        
        // Configurar rutas
        $this->app->get('/api/about', \Tonitf\Portafolio\Controllers\PortfolioController::class . ':getAbout');
        $this->app->get('/api/experience', \Tonitf\Portafolio\Controllers\PortfolioController::class . ':getExperience');
    }
    
    public function testGetAbout()
    {
        $request = (new ServerRequestFactory())->createServerRequest('GET', '/api/about');
        $response = $this->app->handle($request);
        
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('application/json', $response->getHeaderLine('Content-Type'));
        
        $body = (string) $response->getBody();
        $data = json_decode($body, true);
        
        $this->assertArrayHasKey('name', $data);
        $this->assertArrayHasKey('title', $data);
        $this->assertArrayHasKey('email', $data);
        $this->assertEquals('Antonio Troitiño', $data['name']);
    }
    
    public function testGetExperience()
    {
        $request = (new ServerRequestFactory())->createServerRequest('GET', '/api/experience');
        $response = $this->app->handle($request);
        
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('application/json', $response->getHeaderLine('Content-Type'));
        
        $body = (string) $response->getBody();
        $data = json_decode($body, true);
        
        $this->assertIsArray($data);
        $this->assertNotEmpty($data);
        
        // Verificar estructura del primer elemento
        $firstExperience = $data[0];
        $this->assertArrayHasKey('position', $firstExperience);
        $this->assertArrayHasKey('company', $firstExperience);
        $this->assertArrayHasKey('period', $firstExperience);
        $this->assertArrayHasKey('technologies', $firstExperience);
    }
}
