/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { LevelJumpingComponentsPage, LevelJumpingDeleteDialog, LevelJumpingUpdatePage } from './level-jumping-my-suffix.page-object';

const expect = chai.expect;

describe('LevelJumping e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let levelJumpingUpdatePage: LevelJumpingUpdatePage;
    let levelJumpingComponentsPage: LevelJumpingComponentsPage;
    let levelJumpingDeleteDialog: LevelJumpingDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load LevelJumpings', async () => {
        await navBarPage.goToEntity('level-jumping-my-suffix');
        levelJumpingComponentsPage = new LevelJumpingComponentsPage();
        expect(await levelJumpingComponentsPage.getTitle()).to.eq('Level Jumpings');
    });

    it('should load create LevelJumping page', async () => {
        await levelJumpingComponentsPage.clickOnCreateButton();
        levelJumpingUpdatePage = new LevelJumpingUpdatePage();
        expect(await levelJumpingUpdatePage.getPageTitle()).to.eq('Create or edit a Level Jumping');
        await levelJumpingUpdatePage.cancel();
    });

    it('should create and save LevelJumpings', async () => {
        const nbButtonsBeforeCreate = await levelJumpingComponentsPage.countDeleteButtons();

        await levelJumpingComponentsPage.clickOnCreateButton();
        await promise.all([levelJumpingUpdatePage.setDescriptionInput('description')]);
        expect(await levelJumpingUpdatePage.getDescriptionInput()).to.eq('description');
        await levelJumpingUpdatePage.save();
        expect(await levelJumpingUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await levelJumpingComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last LevelJumping', async () => {
        const nbButtonsBeforeDelete = await levelJumpingComponentsPage.countDeleteButtons();
        await levelJumpingComponentsPage.clickOnLastDeleteButton();

        levelJumpingDeleteDialog = new LevelJumpingDeleteDialog();
        expect(await levelJumpingDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Level Jumping?');
        await levelJumpingDeleteDialog.clickOnConfirmButton();

        expect(await levelJumpingComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
