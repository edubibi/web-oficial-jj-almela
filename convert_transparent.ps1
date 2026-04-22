Add-Type -AssemblyName System.Drawing
$inputPath = "C:\Users\Usuario\.gemini\antigravity\scratch\JJ_ALMELA_WEB\notas_with_checkerboard.png"
$outputPath = "C:\Users\Usuario\.gemini\antigravity\scratch\JJ_ALMELA_WEB\assets\images\notas.png"

$img = [System.Drawing.Image]::FromFile($inputPath)
$bmp = New-Object System.Drawing.Bitmap($img)
$img.Dispose()

for ($y=0; $y -lt $bmp.Height; $y++) {
    for ($x=0; $x -lt $bmp.Width; $x++) {
        $pixel = $bmp.GetPixel($x, $y)
        # The notes are very dark. The checkerboard is light/medium grey.
        # Threshold at 120 (approx half way to 255)
        if ($pixel.R -gt 120 -or $pixel.G -gt 120 -or $pixel.B -gt 120) {
            $bmp.SetPixel($x, $y, [System.Drawing.Color]::Transparent)
        }
    }
}
$bmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
Write-Host "Refined transparent PNG saved to $outputPath"
