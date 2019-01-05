import { element, by, ElementFinder } from 'protractor';

export class LevelJumpingHisComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-level-jumping-his-my-suffix div table .btn-danger'));
    title = element.all(by.css('jhi-level-jumping-his-my-suffix div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getText();
    }
}

export class LevelJumpingHisUpdatePage {
    pageTitle = element(by.id('jhi-level-jumping-his-my-suffix-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    dateInput = element(by.id('field_date'));
    horseSelect = element(by.id('field_horse'));
    levelJumpingSelect = element(by.id('field_levelJumping'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setDateInput(date) {
        await this.dateInput.sendKeys(date);
    }

    async getDateInput() {
        return this.dateInput.getAttribute('value');
    }

    async horseSelectLastOption() {
        await this.horseSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async horseSelectOption(option) {
        await this.horseSelect.sendKeys(option);
    }

    getHorseSelect(): ElementFinder {
        return this.horseSelect;
    }

    async getHorseSelectedOption() {
        return this.horseSelect.element(by.css('option:checked')).getText();
    }

    async levelJumpingSelectLastOption() {
        await this.levelJumpingSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async levelJumpingSelectOption(option) {
        await this.levelJumpingSelect.sendKeys(option);
    }

    getLevelJumpingSelect(): ElementFinder {
        return this.levelJumpingSelect;
    }

    async getLevelJumpingSelectedOption() {
        return this.levelJumpingSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class LevelJumpingHisDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-levelJumpingHis-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-levelJumpingHis'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
