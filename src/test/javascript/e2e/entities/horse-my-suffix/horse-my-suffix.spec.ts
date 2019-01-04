/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { HorseComponentsPage, HorseDeleteDialog, HorseUpdatePage } from './horse-my-suffix.page-object';

const expect = chai.expect;

describe('Horse e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let horseUpdatePage: HorseUpdatePage;
    let horseComponentsPage: HorseComponentsPage;
    let horseDeleteDialog: HorseDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Horses', async () => {
        await navBarPage.goToEntity('horse-my-suffix');
        horseComponentsPage = new HorseComponentsPage();
        expect(await horseComponentsPage.getTitle()).to.eq('Horses');
    });

    it('should load create Horse page', async () => {
        await horseComponentsPage.clickOnCreateButton();
        horseUpdatePage = new HorseUpdatePage();
        expect(await horseUpdatePage.getPageTitle()).to.eq('Create or edit a Horse');
        await horseUpdatePage.cancel();
    });

    it('should create and save Horses', async () => {
        const nbButtonsBeforeCreate = await horseComponentsPage.countDeleteButtons();

        await horseComponentsPage.clickOnCreateButton();
        await promise.all([
            horseUpdatePage.setNameInput('name'),
            horseUpdatePage.setBirthdayInput('2000-12-31'),
            horseUpdatePage.setDescentFatherInput('descentFather'),
            horseUpdatePage.setDescentMotherInput('descentMother'),
            horseUpdatePage.setHeightInput('height'),
            horseUpdatePage.setCommentInput('comment'),
            horseUpdatePage.stableSelectLastOption(),
            horseUpdatePage.levelDressageSelectLastOption(),
            horseUpdatePage.levelJumpingSelectLastOption(),
            horseUpdatePage.genderSelectLastOption(),
            horseUpdatePage.colorSelectLastOption()
        ]);
        expect(await horseUpdatePage.getNameInput()).to.eq('name');
        expect(await horseUpdatePage.getBirthdayInput()).to.eq('2000-12-31');
        expect(await horseUpdatePage.getDescentFatherInput()).to.eq('descentFather');
        expect(await horseUpdatePage.getDescentMotherInput()).to.eq('descentMother');
        expect(await horseUpdatePage.getHeightInput()).to.eq('height');
        expect(await horseUpdatePage.getCommentInput()).to.eq('comment');
        await horseUpdatePage.save();
        expect(await horseUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await horseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Horse', async () => {
        const nbButtonsBeforeDelete = await horseComponentsPage.countDeleteButtons();
        await horseComponentsPage.clickOnLastDeleteButton();

        horseDeleteDialog = new HorseDeleteDialog();
        expect(await horseDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Horse?');
        await horseDeleteDialog.clickOnConfirmButton();

        expect(await horseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
