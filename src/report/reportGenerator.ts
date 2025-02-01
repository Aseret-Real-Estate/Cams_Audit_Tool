import { CameraData } from '../audit/cameraAuditor';
import fs from 'fs/promises';
import path from 'path';

export class ReportGenerator {
    generateReport(cameras: CameraData[]): string {
        let report = 'Camera Audit Report\n';
        report += '=================\n\n';

        cameras.forEach(camera => {
            report += this.generateCameraSection(camera);
        });

        return report;
    }

    private generateCameraSection(camera: CameraData): string {
        let section = `Camera: ${camera.name} (${camera.ip})\n`;
        section += `Status: ${camera.status}\n`;
        section += 'Settings:\n';
        
        Object.entries(camera.settings).forEach(([key, value]) => {
            section += `  ${key}: ${value}\n`;
        });
        
        section += '\n';
        return section;
    }

    async saveReport(report: string): Promise<void> {
        const timestamp = new Date().toISOString().replace(/[:]/g, '-');
        const filename = `audit-report-${timestamp}.txt`;
        const reportPath = path.join(process.cwd(), 'reports', filename);
        
        await fs.mkdir(path.join(process.cwd(), 'reports'), { recursive: true });
        await fs.writeFile(reportPath, report, 'utf8');
    }
}
