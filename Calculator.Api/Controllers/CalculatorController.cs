using Calculator.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Calculator.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CalculatorController : ControllerBase
{
    private readonly CalculatorService _calculator;

    public CalculatorController(CalculatorService calculator)
    {
        _calculator = calculator;
    }

    [HttpPost("calculate")]
    public IActionResult Calculate(CalculationRequest request)
    {
        try
        {
            var result = _calculator.Calculate(
                request.A,
                request.B,
                request.Operation);

            return Ok(new CalculationResponse(result));
        }
        catch (DivideByZeroException)
        {
            return BadRequest("Cannot divide by zero");
        }
        catch (ArgumentException)
        {
            return BadRequest(
                "Invalid operation, operator must be one of +, -, *, /");
        }
    }
}

public record CalculationRequest(
    double A,
    double B,
    string Operation);

public record CalculationResponse(double Result);