import { test, expect } from '@playwright/test';
import tasks from '../tasksList/tasksList.json';

test.describe('ToDo List', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://demo.playwright.dev/todomvc/#/');
    });

    test('Add tasks to the list', async ({ page }) => {
        const taskInput = page.getByRole('textbox', { name: 'What needs to be done?' });
        for (const task of tasks.tasks) {
            await taskInput.fill(task);
            await taskInput.press('Enter');
        }

        const taskItems = page.locator('.todo-list li');
        await expect(taskItems).toHaveCount(tasks.tasks.length);
    });

    test('Mark the first task as completed', async ({ page }) => {
        const taskInput = page.getByRole('textbox', { name: 'What needs to be done?' });
        for (const task of tasks.tasks) {
            await taskInput.fill(task);
            await taskInput.press('Enter');
        }

        const firstTaskCheckbox = page.locator('.todo-list li').first().getByRole('checkbox');
        await firstTaskCheckbox.check();

        const completedTasks = page.locator('.todo-list li.completed');
        await expect(completedTasks).toHaveCount(1);
    });

    test('Count and display how many tasks are yet to be completed', async ({ page }) => {
        const taskInput = page.getByRole('textbox', { name: 'What needs to be done?' });
        for (const task of tasks.tasks) {
            await taskInput.fill(task);
            await taskInput.press('Enter');
        }

        const firstTaskCheckbox = page.locator('.todo-list li').first().getByRole('checkbox');
        await firstTaskCheckbox.check();

        const remainingTasks = page.locator('.todo-count strong');
        await expect(remainingTasks).toHaveText((tasks.tasks.length - 1).toString());
        const remainingCount = await remainingTasks.textContent();
        console.log(`Tasks left to do: ${remainingCount}`);
    });
});
